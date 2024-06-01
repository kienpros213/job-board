import { User as _User } from './user';
import { Post as _Post } from './post';
import { Application as _Application } from './application';

export namespace PrismaModel {
  export class User extends _User {}
  export class Post extends _Post {}
  export class Application extends _Application {}

  export const extraModels = [User, Post, Application];
}
