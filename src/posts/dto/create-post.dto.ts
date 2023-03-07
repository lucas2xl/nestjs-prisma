import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Título do post',
    example: 'Título',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Conteúdo do post',
    example: 'Conteúdo',
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    description: 'Id do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000.',
  })
  @IsUUID()
  @IsNotEmpty()
  authorId: string;
}
