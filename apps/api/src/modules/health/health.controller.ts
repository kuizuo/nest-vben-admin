import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HttpHealthIndicator,
  HealthCheck,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { Permission } from '../auth/decorators/permission.decorator';

export const PermissionHealth = {
  NETWORK: 'app:health:network',
  DB: 'app:health:database',
  MH: 'app:health:memory-heap',
  MR: 'app:health:memory-rss',
  DISK: 'app:health:disk',
} as const;

@ApiTags('Health - 健康检查')
@Controller('health')
export class HealthController {
  constructor(
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get('network')
  @HealthCheck()
  @Permission(PermissionHealth.NETWORK)
  async checkNetwork() {
    return this.http.pingCheck('kuizuo', 'https://kuizuo.cn');
  }

  @Get('database')
  @HealthCheck()
  @Permission(PermissionHealth.DB)
  async checkDatabase() {
    return this.db.pingCheck('database');
  }

  @Get('memory-heap')
  @HealthCheck()
  @Permission(PermissionHealth.MH)
  async checkMemoryHeap() {
    // the process should not use more than 200MB memory
    return this.memory.checkHeap('memory-heap', 200 * 1024 * 1024);
  }

  @Get('memory-rss')
  @HealthCheck()
  @Permission(PermissionHealth.MR)
  async checkMemoryRSS() {
    // the process should not have more than 200MB RSS memory allocated
    return this.memory.checkRSS('memory-rss', 200 * 1024 * 1024);
  }

  @Get('disk')
  @HealthCheck()
  @Permission(PermissionHealth.DISK)
  async checkDisk() {
    return this.disk.checkStorage('disk', {
      // The used disk storage should not exceed 75% of the full disk size
      thresholdPercent: 0.75,
      path: '/',
    });
  }
}
