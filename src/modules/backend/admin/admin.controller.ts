import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('common/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('add')
  create(@Body() CreateAdminDto: CreateAdminDto) {
    return this.adminService.create(CreateAdminDto);
  }

  @Get('list')
  findList(@Query() query: any) {
    return this.adminService.findAll(query);
  }

  @Get('list-all')
  findAllList(@Query() query: any) {
    return this.adminService.findAll(query, true);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Post('update')
  update(@Body() data: UpdateAdminDto) {
    return this.adminService.update(data);
  }

  @Post('remove')
  remove(@Body('id') id: string | Array<string>) {
    return this.adminService.remove(id);
  }

  @Post('soft-remove')
  softRemove(@Body('id') id: string | Array<string>) {
    return this.adminService.softRemove(id);
  }

  @Post('restore')
  restore(@Body('id') id: string | Array<string>) {
    return this.adminService.restore(id);
  }
}
