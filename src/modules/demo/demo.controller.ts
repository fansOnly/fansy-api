import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post('add')
  create(@Body() createUserDto: CreateDemoDto) {
    return this.demoService.create(createUserDto);
  }

  @Get('list')
  findList(@Query() query: any) {
    return this.demoService.findAll(query);
  }

  @Get('list-all')
  findAllList(@Query() query: any) {
    return this.demoService.findAll(query, true);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.demoService.findOne(id);
  }

  @Post('update')
  update(@Body() data: UpdateDemoDto) {
    const { id, ...updateUserDto } = data;
    return this.demoService.update(id, updateUserDto);
  }

  @Post('remove')
  remove(@Body('id') id: string | Array<string>) {
    return this.demoService.remove(id);
  }

  @Post('soft-remove')
  softRemove(@Body('id') id: string | Array<string>) {
    return this.demoService.softRemove(id);
  }

  @Post('restore')
  restore(@Body('id') id: string | Array<string>) {
    return this.demoService.restore(id);
  }
}
