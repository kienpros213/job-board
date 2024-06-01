import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from 'src/dto/create.post.dto';
import { Post as PostModel } from '@prisma/client';
import { UpdatePostDto } from 'src/dto/update.post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get('/find/:title')
  async findPost(@Param('title') title: string): Promise<PostModel | null> {
    return this.postService.findPost(title);
  }

  @Get('/findManyPost/')
  async findManyPost(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ): Promise<PostModel[] | null> {
    return this.postService.findManyPost(skip, take);
  }

  @Delete('/delete/:id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Patch('update')
  async updatePost(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(updatePostDto);
  }
}
