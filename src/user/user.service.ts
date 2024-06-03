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
    const user = await this.prismaService.user
      .findUnique({
        where: {
          username: username,
        },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (!user) {
      throw new HttpException('Username not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  //find by email
  async findUserByEmail(email: string): Promise<User | null> {
    const userEmail = await this.prismaService.user
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

    if (!userEmail) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }
    return userEmail;
  }

  async findManyUser(username: string): Promise<User[] | null> {
    const manyUser = this.prismaService.user
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

    if (!manyUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return manyUser;
  }

  //create account
  async createUser(createUserData: CreateUserDto) {
    //find user
    const user = await this.prismaService.user
      .findUnique({
        where: {
          username: createUserData.username,
        },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    //find email
    const userEmail = await this.prismaService.user
      .findUnique({
        where: {
          email: createUserData.email,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    //check existence of user and email
    if (user) {
      throw new ConflictException('Username already exists');
    }

    if (userEmail) {
      console.log(userEmail);
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
          'Wrong password',
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
