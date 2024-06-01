import {
  Injectable,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  //find by username
  async findUser(username: string): Promise<User | null> {
    return this.prismaService.user
      .findUnique({
        where: {
          username: username,
        },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  //find by email
  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async findManyUser(username: string): Promise<User[] | null> {
    return this.prismaService.user
      .findMany({
        where: {
          username: username,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  //create account
  async createUser(createUserData: CreateUserDto) {
    const existingUser = await Promise.all([
      this.findUser(createUserData.username),
      this.findUserByEmail(createUserData.email),
    ]);

    if (existingUser[0]) {
      throw new ConflictException('Username already exists');
    }

    if (existingUser[1]) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserData.password, 10);

    return await this.prismaService.user
      .create({
        data: { ...createUserData, password: hashedPassword },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  //delete user
  async deleteUser(userId: number) {
    return await this.prismaService.user
      .delete({
        where: {
          user_id: userId,
        },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  //update user
  async updateUser(updateUserData: any) {
    const existingUser = await this.findUser(updateUserData.username);

    if (existingUser) {
      const isExist = await bcrypt.compare(
        updateUserData.oldPassword,
        existingUser.password,
      );
      if (!isExist) {
        throw new HttpException(
          'wrong password',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    const newHashedPassword = await bcrypt.hash(updateUserData.newPassword, 10);

    return await this.prismaService.user
      .update({
        where: {
          username: updateUserData.username,
        },
        data: {
          email: updateUserData.email || undefined,
          password: newHashedPassword || undefined,
        },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
