import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    const alex = await prisma.user.upsert({
      where: { email: 'a@prisma.io' },
      update: {},
      create: {
        email: 'a@prisma.io',
        username: 'Alex',
        password: 'apassword',
      },
    });
    const bob = await prisma.user.upsert({
      where: { email: 'b@prisma.io' },
      update: {},
      create: {
        email: 'b@prisma.io',
        username: 'Bob',
        password: 'bpassword',
      },
    });
    console.log({ alex, bob });
  }
}
