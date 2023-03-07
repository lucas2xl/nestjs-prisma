import { Injectable } from '@nestjs/common';
import { PostsProtocol } from '../../common/filters/protocols/posts-protocol';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostsRepository implements PostsProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async store(createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.prisma.post.create({ data: createPostDto });
  }

  async index(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({ include: { author: true } });
  }

  async show(id: string): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<void> {
    await this.prisma.post.update({ where: { id }, data: updatePostDto });
  }

  async destroy(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }

  async findById(id: string): Promise<PostEntity> {
    return this.prisma.post.findUnique({ where: { id } });
  }
}
