import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findById(id:string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
  async create(data:{
    name:string;
    email: string;
    passwordHash: string;
    role: UserRole;
  }) {
    return this.prismaService.user.create({
      data,
    });
  }
}
