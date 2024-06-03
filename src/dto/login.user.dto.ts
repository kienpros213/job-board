import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ default: 'kien1529164' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiProperty({ default: '1529164' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password: string;
}
