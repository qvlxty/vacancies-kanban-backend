import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateOrderDto {

    @IsArray()
    orderItems: {
        id: number,
        order: number
    }[]
}
