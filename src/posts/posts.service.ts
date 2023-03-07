import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts-repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) {}

  async store(createPostDto: CreatePostDto) {
    return this.repository.store(createPostDto);
  }

  async index() {
    return this.repository.index();
  }

  async show(id: string) {
    return this.repository.show(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.repository.update(id, updatePostDto);
  }

  async destroy(id: string) {
    return this.repository.destroy(id);
  }
}
