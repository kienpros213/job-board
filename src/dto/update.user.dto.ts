import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ default: 'username' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiProperty({ default: 'old password' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  oldPassword: string;

  @ApiProperty({ default: 'new password' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  newPassword: string;
}
