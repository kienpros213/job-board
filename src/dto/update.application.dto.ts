import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateApplicationDto {
  @IsString()
  @IsNotEmpty()
  cover_letter: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  update_at: Date = new Date();

  @IsNotEmpty()
  @IsNumber()
  application_id: number;
}
