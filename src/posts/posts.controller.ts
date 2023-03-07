import { JwtAuthGuard } from '@/auth/shared/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  store(@Body() createPostDto: CreatePostDto) {
    return this.postsService.store(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  index() {
    return this.postsService.index();
  }

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  show(@Param('id') id: string) {
    return this.postsService.show(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.postsService.destroy(id);
  }
}
