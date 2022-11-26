import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PageResult, ResOp } from './common/class/res.class';
import { BaseEntity } from './entities/base.entity';
import { AppsModule } from './modules/apps/apps.module';
import { AppConfigService } from './shared/services/app/app-config.service';

export function setupSwagger(app: INestApplication, config: AppConfigService): void {
  const { enable, path } = config.swaggerConfig;
  if (!enable) return;

  // 配置 Swagger 文档
  const options = new DocumentBuilder()
    // .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle(config.appConfig.name)
    .setDescription(`${config.appConfig.name} API 接口文档`)
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
    .setTitle(`${config.appConfig.name} 业务 API document`)
    .setDescription(`${config.appConfig.name} 业务 API document`)
    .setVersion('1.0')
    .build();
  const document_apps = SwaggerModule.createDocument(app, options_apps, {
    include: [AppsModule],
    ignoreGlobalPrefix: false,
    extraModels: [BaseEntity, ResOp, PageResult],
  });
  SwaggerModule.setup(path + '/apps', app, document_apps);
}
