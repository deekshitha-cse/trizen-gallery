import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersService } from './users/users.service.js';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
})
export class AppModule {}
