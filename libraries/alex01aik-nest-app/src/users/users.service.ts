import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DIPrisma } from 'src/DIP';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(DIPrisma) private readonly prisma: PrismaClient) {}

  async getAllUsers(): Promise<Array<UpdateUserDto>> {
    return await this.prisma.user.findMany({});
  }
  async createUser(body) {
    return await this.prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
  }
  async getUser(id): Promise<UpdateUserDto> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
  async updateUser(id, changedfields): Promise<UpdateUserDto> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...changedfields,
      },
    });
  }
  async deleteUser(id): Promise<UpdateUserDto> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}