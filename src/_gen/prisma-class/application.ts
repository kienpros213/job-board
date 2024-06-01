import { Post } from './post';
import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Application {
  @ApiProperty({ type: Number })
  application_id: number;

  @ApiProperty({ type: () => Post })
  job_id: Post;

  @ApiProperty({ type: () => User })
  applicant_id: User;

  @ApiPropertyOptional({ type: String })
  cover_letter?: string;

  @ApiPropertyOptional({ type: String })
  cv_url?: string;

  @ApiProperty({ type: String })
  status: string;

  @ApiProperty({ type: Date })
  create_at: Date;

  @ApiProperty({ type: Date })
  update_at: Date;

  @ApiProperty({ type: Number })
  user_id: number;

  @ApiProperty({ type: Number })
  post_id: number;
}
