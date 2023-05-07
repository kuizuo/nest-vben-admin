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
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

import { IoAdapter } from '@nestjs/platform-socket.io';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

import { IAppConfig } from './config';
import { AppFilter } from './filters/app.filter';
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
      // snapshot: true,
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
  app.useGlobalFilters(new AppFilter(app.get(AppLoggerService)));

  app.useGlobalInterceptors(
    // 请求超时处理
    new TimeoutInterceptor(30000),
    // 序列化处理
    new ClassSerializerInterceptor(reflector),
    // 返回数据处理
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
            return `property ${e.property} validation failed: ${msg}, following constraints: ${rule}`;
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

  await app.listen(port, '0.0.0.0');

  // started log
  const logger = new Logger('NestApplication');
  logger.log(`Server running on ${await app.getUrl()}`);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
