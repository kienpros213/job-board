import { IsDate, IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'update title' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ default: 'upddate description' })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'update location' })
  location: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ default: 'update salary' })
  salary: number;

  @IsDate()
  update_at: Date = new Date();

  @ApiProperty({ default: 'update user_id' })
  user_id: number;
}
