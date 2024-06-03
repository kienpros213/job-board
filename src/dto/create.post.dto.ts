import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'title' })
  title: string;

  @IsString()
  @ApiPropertyOptional({ default: 'description' })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'location' })
  location: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 'salary' })
  salary: number;

  @IsDate()
  post_at: Date = new Date();

  @IsDate()
  update_at: Date = new Date();

  @ApiProperty({ default: 1 })
  user_id: number;
}
