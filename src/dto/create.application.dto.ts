import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  cover_letter: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  post_at: Date = new Date();

  @IsDate()
  update_at: Date = new Date();

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  post_id: number;
}
