import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './repositories/posts-repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PrismaService],
})
export class PostsModule {}
