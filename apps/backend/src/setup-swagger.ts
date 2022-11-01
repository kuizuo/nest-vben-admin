import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import fs from 'fs';

export function setupSwagger(app: INestApplication): void {
  const configService: ConfigService = app.get(ConfigService);
  const path = configService.get<string>('swagger.path', 'swagger-ui');
  // 默认为启用
  const enable = configService.get<boolean>('swagger.enable', true);

  // 判断是否需要启用
  if (!enable) {
    return;
  }

  // 配置Swagger文档
  const options = new DocumentBuilder()
    // .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle(configService.get<string>('swagger.title'))
    .setDescription('相关 API 接口文档')
    .setVersion('1.0')
    .setLicense('MIT', 'https://github.com/kuizuo/kz-nest-admin')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    // include: [ApiModule],
    ignoreGlobalPrefix: false,
  });

  // 导出数据JSON格式，方便导入第三方API接口工具
  // fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

  SwaggerModule.setup(path, app, document);
}
