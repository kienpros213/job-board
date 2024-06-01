import { User } from './user';
import { Application } from './application';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Post {
  @ApiProperty({ type: Number })
  post_id: number;

  @ApiProperty({ type: () => User })
  post_by: User;

  @ApiProperty({ type: String })
  title: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: String })
  location: string;

  @ApiProperty({ type: Number })
  salary: number;

  @ApiProperty({ type: Date })
  post_at: Date;

  @ApiProperty({ type: Date })
  update_at: Date;

  @ApiProperty({ type: Number })
  user_id: number;

  @ApiProperty({ isArray: true, type: () => Application })
  applicants: Application[];
}
