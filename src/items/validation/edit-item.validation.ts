import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class EditItemValidation {
    @IsInt()
    @IsNotEmpty()
    itemId: number;

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