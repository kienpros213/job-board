import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto {
  @ApiProperty({ default: 'cover_letter' })
  @IsString()
  @IsNotEmpty()
  cover_letter: string;

  @ApiProperty({ default: 'status' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  update_at: Date = new Date();

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  application_id: number;
}
