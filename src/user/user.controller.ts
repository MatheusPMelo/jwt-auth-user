import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
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
