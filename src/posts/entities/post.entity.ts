import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: string;
  isPublished: boolean;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}
