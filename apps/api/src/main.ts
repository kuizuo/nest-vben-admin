import cluster from 'cluster';
import path from 'path';
import { performance } from 'perf_hooks';

import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

import { IoAdapter } from '@nestjs/platform-socket.io';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

import { IAppConfig } from './config';
import { AppFilter } from './filters/app.filter';
import { isDev, isMainProcess } from './global/env';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppLoggerService } from './modules/shared/services/app-logger.service';
import { setupSwagger } from './utils/setup-swagger';

// catchError();

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
      snapshot: true,
    },
  );

  // app config service
  const configService = app.get(ConfigService);

  // reflector
  const reflector = app.get(Reflector);

  // class-validator 的 DTO 类中注入nestjs容器的依赖
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(app.get(AppLoggerService));
  app.enableCors({ origin: '*', credentials: true });
  app.useStaticAssets({ root: path.join(__dirname, '..', 'public') });

  // https://github.com/fastify/fastify-multipart/
  // eslint-disable-next-line global-require
  await app.register(require('@fastify/multipart'), {
    attachFieldsToBody: true,
    limits: {
      fileSize: 1024 * 1024 * 10, // 10M
      files: 1,
    },
  });

  // 处理异常请求
  app.useGlobalFilters(new AppFilter());

  app.useGlobalInterceptors(
    // 请求超时
    new TimeoutInterceptor(30000),
    // 序列化
    new ClassSerializerInterceptor(reflector),
    // Logging
    isDev ? new LoggingInterceptor() : null,
    // 返回数据转换
    new TransformInterceptor(new Reflector()),
  );

  // 使用全局管道验证数据
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      // forbidNonWhitelisted: true, // 禁止 无装饰器验证的数据通过
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) =>
        new UnprocessableEntityException(
          errors.map((e) => {
            const rule = Object.keys(e.constraints)[0];
            const msg = e.constraints[rule];
            // return `property ${e.property} validation failed: ${msg}, following constraints: ${rule}`;
            return msg;
          })[0],
        ),
    }),
  );

  // websocket
  app.useWebSocketAdapter(new IoAdapter());

  // global prefix
  const { globalPrefix, port } = configService.get<IAppConfig>('app');
  app.setGlobalPrefix(globalPrefix);

  setupSwagger(app, configService);

  await app.listen(port, '0.0.0.0', async () => {
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
      logger.log(`[${prefix + pid}] OpenApi: ${url}/api-docs`);
    }
    logger.log(`Server is up. ${`+${performance.now() | 0}ms`}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
