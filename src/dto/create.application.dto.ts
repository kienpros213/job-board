import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ default: 'cover_letter' })
  @IsString()
  @IsNotEmpty()
  cover_letter: string;

  @ApiProperty({ default: 'status' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  post_at: Date = new Date();

  @IsDate()
  update_at: Date = new Date();

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  post_id: number;
}
