import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  findList(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get('list-all')
  findAllList(@Query() query: any) {
    return this.userService.findAll(query, true);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('update')
  update(@Body() data: UpdateUserDto) {
    return this.userService.update(data);
  }

  @Post('remove')
  remove(@Body('id') id: string | Array<string>) {
    return this.userService.remove(id);
  }

  @Post('soft-remove')
  softRemove(@Body('id') id: string | Array<string>) {
    return this.userService.softRemove(id);
  }

  @Post('restore')
  restore(@Body('id') id: string | Array<string>) {
    return this.userService.restore(id);
  }
}
