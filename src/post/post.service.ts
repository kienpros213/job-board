import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  //create post
  async createPost(createPostDto: any) {
    console.log(createPostDto.post_at);
    return await this.prismaService.user
      .update({
        where: {
          user_id: createPostDto.user_id,
        },
        data: {
          posts: {
            create: {
              title: createPostDto.title,
              description: createPostDto.description,
              location: createPostDto.location,
              salary: createPostDto.salary,
              post_at: createPostDto.post_at,
              update_at: createPostDto.update_at,
            },
          },
        },
        include: {
          posts: true,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  //find post
  async findPost(title: any): Promise<PostModel | null> {
    const post = await this.prismaService.post
      .findFirst({
        where: {
          title: title,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post;
  }

  async findManyPost(skip: number, take: number): Promise<PostModel[] | null> {
    const post = await this.prismaService.post
      .findMany({
        skip: skip,
        take: take,
      })
      .catch((error) => {
        console.log(error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post;
  }

  //delete post
  async deletePost(postId: string) {
    const id = parseInt(postId);
    return await this.prismaService.post
      .delete({
        where: {
          post_id: id,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  //update post
  async updatePost(updatePostData: any) {
    return await this.prismaService.post
      .update({
        where: {
          post_id: updatePostData.post_id,
        },
        data: {
          title: updatePostData.title || undefined,
          description: updatePostData.description || undefined,
          location: updatePostData.location || undefined,
          salary: updatePostData.salary || undefined,
          update_at: updatePostData.update_at || undefined,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
