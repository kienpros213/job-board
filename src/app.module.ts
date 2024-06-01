import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { PrismaService } from 'prisma/prisma.service';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PostModule, ApplicationModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PostService, PrismaService],
})
export class AppModule {}
