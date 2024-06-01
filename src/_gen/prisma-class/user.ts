import { Post } from './post';
import { Application } from './application';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  user_id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ isArray: true, type: () => Post })
  posts: Post[];

  @ApiProperty({ isArray: true, type: () => Application })
  applications: Application[];
}
