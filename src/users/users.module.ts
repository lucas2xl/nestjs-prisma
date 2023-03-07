import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { UsersRepository } from './repositories/users-repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersRepository],
})
export class UsersModule {}
