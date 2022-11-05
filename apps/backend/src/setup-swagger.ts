import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PageResult, ResOp } from './common/class/res.class';
import { BaseEntity } from './entities/base.entity';

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
}
