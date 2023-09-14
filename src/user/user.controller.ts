import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':email')
  getByEmail(@Param('email') email: string) {
    const user = this.userService.getByEmail(email);

    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
