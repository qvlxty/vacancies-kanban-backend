import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRespondentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsOptional()
  vacancyId?: number
}
