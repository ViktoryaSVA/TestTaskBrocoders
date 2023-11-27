import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteItemValidation {
    @IsInt()
    @IsNotEmpty()
    itemId: number;

    @IsInt()
    @IsNotEmpty()
    listId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}