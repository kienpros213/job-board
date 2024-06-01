import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  post_by: User;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @ApiPropertyOptional({ type: String })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  location: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  salary: number;

  @IsDate()
  @ApiProperty({ type: Date })
  post_at: Date = new Date();

  @IsDate()
  @ApiProperty({ type: Date })
  update_at: Date = new Date();

  @ApiProperty({ type: Number })
  user_id: number;
}
