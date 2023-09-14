import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new Error('User exists, try another email');
    }

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async getAll() {
    const data = await this.prisma.user.findMany();

    if (data.length === 0) {
      return 'No users';
    }

    return data;
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async delete(id: number): Promise<User> {
    console.log(id);
    const userExists = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    const deletedUser = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return deletedUser;
  }
}
