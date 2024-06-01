import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  oldPassword: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  newPassword: string;
}
