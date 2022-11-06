import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PageResult, ResOp } from './common/class/res.class';
import { BaseEntity } from './entities/base.entity';
import { AppsModule } from './modules/apps/apps.module';

export function setupSwagger(app: INestApplication): void {
  const configService: ConfigService = app.get(ConfigService);
  const path = configService.get<string>('swagger.path', 'swagger-ui');
  const enable = configService.get<boolean>('swagger.enable', true);

  // 判断是否需要启用
  if (!enable) return;

  // 配置 Swagger 文档
  const options = new DocumentBuilder()
    // .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle(configService.get<string>('swagger.title'))
    .setDescription('kz-admin API 接口文档')
    .setVersion('1.0')
    .setLicense('MIT', 'https://github.com/kuizuo/kz-admin')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
    extraModels: [BaseEntity, ResOp, PageResult],
  });

  SwaggerModule.setup(path, app, document);

  // 业务 api文档
  const options_apps = new DocumentBuilder()
    .setTitle('kz-admin 业务 API document')
    .setDescription('kz-admin 业务 API document')
    .setVersion('1.0')
    .build();
  const document_apps = SwaggerModule.createDocument(app, options_apps, {
    include: [AppsModule],
    ignoreGlobalPrefix: false,
    extraModels: [BaseEntity, ResOp, PageResult],
  });
  SwaggerModule.setup(path + '/apps', app, document_apps);
}
