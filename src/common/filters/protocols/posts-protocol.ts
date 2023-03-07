import { CreatePostDto } from '../../../posts/dto/create-post.dto';
import { UpdatePostDto } from '../../../posts/dto/update-post.dto';
import { PostEntity } from '../../../posts/entities/post.entity';

export interface PostsProtocol {
  store(createPostDto: CreatePostDto): Promise<PostEntity>;
  index(): Promise<PostEntity[]>;
  show(id: string): Promise<PostEntity>;
  update(id: string, updatePostDto: UpdatePostDto): Promise<void>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<PostEntity>;
}
