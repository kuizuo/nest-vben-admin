import { ApiProperty } from '@nestjs/swagger';

export class LoginLogInfo {
  @ApiProperty({ description: '日志编号' })
  id: number;

  @ApiProperty({ description: '登录ip', example: '1.1.1.1' })
  ip: string;

  @ApiProperty({ description: '登录地址' })
  address: string;

  @ApiProperty({ description: '系统', example: 'Windows 10' })
  os: string;

  @ApiProperty({ description: '浏览器', example: 'Chrome' })
  browser: string;

  @ApiProperty({ description: '时间', example: '2022-01-01 00:00:00' })
  time: string;

  @ApiProperty({ description: '登录用户名', example: 'admin' })
  username: string;
}
