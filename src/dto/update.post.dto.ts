import { IsDate, IsOptional, IsNumber, IsString } from 'class-validator';
import { User } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @IsOptional()
  @ApiProperty()
  post_id: number;

  @IsOptional()
  @ApiProperty()
  post_by: User;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  location: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  salary: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date })
  post_at: Date = new Date();

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date })
  update_at: Date = new Date();

  @IsOptional()
  @ApiProperty({ type: Number })
  user_id: number;
}
