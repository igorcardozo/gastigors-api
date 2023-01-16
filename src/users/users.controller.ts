import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    return await this.userService.getUser(id);
  }

  @Get()
  async findAll(): Promise<GetUserDto[]> {
    return await this.userService.getUsers();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
