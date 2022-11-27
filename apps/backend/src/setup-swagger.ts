import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PageResult, ResOp } from './common/class/res.class';
import { AbstractEntity } from './common/abstract.entity';
import { AppConfigService } from './shared/services/app/app-config.service';
import { API_SECURITY_AUTH } from './common/decorators/swagger.decorator';

export function setupSwagger(
  app: INestApplication,
  config: AppConfigService,
): void {
  const { enable, path } = config.swaggerConfig;
  if (!enable) return;

  // 配置 Swagger 文档
  const documentBuilder = new DocumentBuilder()
    .setTitle(config.appConfig.name)
    .setDescription(`${config.appConfig.name} API 接口文档`)
    .setVersion('1.0')
    .setLicense('MIT', 'https://github.com/kuizuo/kz-admin');

  // auth security
  documentBuilder.addSecurity(API_SECURITY_AUTH, {
    description: 'Auth',
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
  });

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
    extraModels: [AbstractEntity, ResOp, PageResult],
  });

  SwaggerModule.setup(path, app, document);

  // started log
  const logger = new Logger('SwaggerModule');
  logger.log(
    `Document running on http://127.0.0.1:${config.appConfig.port}/${path}`,
  );
}
