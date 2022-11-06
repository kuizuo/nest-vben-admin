import { ApiProperty } from '@nestjs/swagger';
import SysRoleMenu from '@/entities/admin/sys-role-menu.entity';
import SysRole from '@/entities/admin/sys-role.entity';

export class RoleInfo {
  @ApiProperty({ type: SysRole })
  info: SysRole;

  @ApiProperty({
    type: [SysRoleMenu],
  })
  menus: any[];
}
