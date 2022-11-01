import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });

import { NestFactory, Reflector } from '@nestjs/core';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { setupSwagger } from './setup-swagger';
import { LoggerService } from './shared/logger/logger.service';
import { ApiExceptionFilter } from './common/filter/api-exception.filter';
import { ApiTransformInterceptor } from './common/interceptors/api-transform.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

const PORT = process.env.PORT;
const WS_PORT = process.env.WS_PORT;
const PREFIX = process.env.PREFIX;
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    // bufferLogs: true,
  });
  app.useLogger(app.get(LoggerService));
  app.enableCors({ origin: '*', credentials: true });
  app.useStaticAssets({ root: path.join(__dirname, '..', 'public') });
  // https://github.com/fastify/fastify-multipart/
  await app.register(require('@fastify/multipart'), {
    limits: {
      fileSize: 1000000,
      files: 1,
    },
  });

  // 全局请求添加prefix
  app.setGlobalPrefix(PREFIX);
  // 处理异常请求
  app.useGlobalFilters(new ApiExceptionFilter(app.get(LoggerService)));
  // 请求超时处理
  app.useGlobalInterceptors(new TimeoutInterceptor(30000));
  // 返回数据处理
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  // websocket
  app.useWebSocketAdapter(new IoAdapter());
  // 使用全局管道验证数据
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // forbidNonWhitelisted: true, // 禁止 无装饰器验证的数据通过
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(Object.values(errors[0].constraints)[0]);
      },
    }),
  );

  setupSwagger(app);

  await app.listen(PORT, '0.0.0.0', () => {
    Logger.log(process.env.NODE_ENV, 'Server started,current env');
    Logger.log(`api服务已启动,请访问: http://127.0.0.1:${PORT}/${PREFIX}`);
    Logger.log(`ws服务已启动,请访问: http://127.0.0.1:${WS_PORT}/${process.env.WS_PATH}`);
    Logger.log(`API文档已生成,请访问: http://127.0.0.1:${PORT}/${process.env.SWAGGER_PARH}/`);
  });
}
bootstrap();
