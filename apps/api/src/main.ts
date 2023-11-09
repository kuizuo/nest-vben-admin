import cluster from 'cluster';
import path from 'path';

import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

import { fastifyApp } from './common/adapters/fastify.adapter';
import { IoAdapter } from './common/adapters/socket.adapter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { IAppConfig } from './config';
import { isDev, isMainProcess } from './global/env';
import { setupSwagger } from './setup-swagger';
import { MyLogger } from './shared/logger/logger.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      bufferLogs: true,
      snapshot: true,
    },
  );

  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);

  // class-validator 的 DTO 类中注入 nest 容器的依赖
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({ origin: '*', credentials: true });
  app.setGlobalPrefix('api');
  app.useStaticAssets({ root: path.join(__dirname, '..', 'public') });

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformInterceptor(reflector),
    new TimeoutInterceptor(),
  );

  if (isDev) {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      // forbidNonWhitelisted: true, // 禁止 无装饰器验证的数据通过
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: true,
      exceptionFactory: (errors) =>
        new UnprocessableEntityException(
          errors.map((e) => {
            const rule = Object.keys(e.constraints!)[0];
            const msg = e.constraints![rule];
            return msg;
          })[0],
        ),
    }),
  );

  // websocket
  app.useWebSocketAdapter(new IoAdapter());

  const { port } = configService.get<IAppConfig>('app')!;

  setupSwagger(app, configService);

  await app.listen(port, '0.0.0.0', async () => {
    app.useLogger(app.get(MyLogger));
    const url = await app.getUrl();
    const { pid } = process;
    const env = cluster.isPrimary;
    const prefix = env ? 'P' : 'W';

    if (!isMainProcess) {
      return;
    }

    const logger = new Logger('NestApplication');
    logger.log(`[${prefix + pid}] Server running on ${url}`);

    if (isDev) {
      logger.log(`[${prefix + pid}] OpenAPI: ${url}/api-docs`);
    }
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
