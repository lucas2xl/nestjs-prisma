import { JwtAuthGuard } from '@/auth/shared/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 409, description: 'Conflito de e-mail' })
  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    return this.usersService.store(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.show(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.usersService.destroy(id);
  }
}
