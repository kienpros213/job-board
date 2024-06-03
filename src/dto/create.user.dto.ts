import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'email@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'username' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password: string;
}
