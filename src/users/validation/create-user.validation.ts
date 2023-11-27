import { IsNotEmpty } from 'class-validator';

export class CreateUserValidation {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    email?: string;
}