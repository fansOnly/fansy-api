import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('common/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('add')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('list')
  findAll(@Query() query: any) {
    return this.roleService.findAll(query);
  }

  @Get('list-all')
  findAllList(@Query() query: any) {
    return this.roleService.findAll(query, true);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Post('update')
  update(@Body() data: UpdateRoleDto) {
    return this.roleService.update(data);
  }

  @Post('remove')
  remove(@Body('id') id: string | Array<string>) {
    return this.roleService.remove(id);
  }

  @Post('soft-remove')
  softRemove(@Body('id') id: string | Array<string>) {
    return this.roleService.softRemove(id);
  }

  @Post('restore')
  restore(@Body('id') id: string | Array<string>) {
    return this.roleService.restore(id);
  }
}
