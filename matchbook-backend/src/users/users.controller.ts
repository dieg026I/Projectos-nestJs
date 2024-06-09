import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: Users) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('userCity')
  findAllWithCity() {
    return this.usersService.findAllWithCity();
  }

  @Get('rut/:id')
  findOne(@Param('id') rut_user: number) {
    return this.usersService.findOne(rut_user);
  }

  @Get('publication/:rut_user')
  findOnePublication(@Param('rut_user') rut_user: number) {
    return this.usersService.findAllWithPublication(rut_user);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() user: Users) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  
}