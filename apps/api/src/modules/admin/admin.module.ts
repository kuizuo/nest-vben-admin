import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { AuthGuard } from '@/common/guards/auth.guard';
import { LoginModule } from './login/login.module';
import { SystemModule } from './system/system.module';
import { ToolsModule } from './tools/tools.module';
import { UploadModule } from './upload/upload.module';

/**
 * Admin模块
 */
@Module({
  imports: [
    // register prefix
    RouterModule.register([
      {
        path: '',
        children: [
          { path: 'account', module: AccountModule },
          { path: 'sys', module: SystemModule },
          { path: 'tools', module: ToolsModule },
          { path: 'upload', module: UploadModule },
        ],
      },
      // like this url /captcha/img  /login
      {
        path: '',
        module: LoginModule,
      },
    ]),
    // component module
    LoginModule,
    AccountModule,
    SystemModule,
    ToolsModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [SystemModule],
})
export class AdminModule {}
