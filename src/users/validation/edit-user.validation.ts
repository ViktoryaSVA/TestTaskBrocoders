import { IsOptional } from 'class-validator';

export class EditUserValidation {
    @IsOptional()
    username?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    email?: string;
}