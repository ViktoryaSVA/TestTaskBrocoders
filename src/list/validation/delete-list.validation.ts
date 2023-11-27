import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteListValidation {
    @IsInt()
    @IsNotEmpty()
    listId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}