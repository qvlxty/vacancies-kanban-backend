import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, isEnum } from 'class-validator';

export class UpdateRespondentDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    vacancyId?: number

    status?: string
    userId?: number

    @IsString()
    @IsOptional()
    essay?: string

    @IsString()
    @IsOptional()
    feedback?: string

    @IsString()
    @IsOptional()
    additionalMessages?: string

    @IsDateString()
    @IsOptional()
    interviewDate: Date
}
