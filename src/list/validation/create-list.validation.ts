import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateListValidation {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsOptional()
    title?: string;
}