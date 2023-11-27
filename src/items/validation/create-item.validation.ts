import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateItemValidation {
    @IsInt()
    @IsNotEmpty()
    listId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsOptional()
    description?: string;

    @IsOptional()
    isDone?: boolean;
}