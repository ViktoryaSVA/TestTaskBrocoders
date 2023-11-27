import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Param,
    ParseIntPipe,
    Post,
    Put,
    ValidationPipe
} from "@nestjs/common";
import { Crud } from '@nestjsx/crud';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserValidation } from "./validation/create-user.validation";
import { validate } from "class-validator";
import { EditUserDto } from "./dto/edit-user.dto";
import { EditUserValidation } from "./validation/edit-user.validation";

@Crud({
    model: {
        type: User
    }
})
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}


    @Post('create')
    async createUser(@Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto): Promise<User | ResponseObject> {
        try {
            const validation = new CreateUserValidation();

            Object.assign(validation, createUserDto);

            const errors = await validate(validation);

            if (errors.length > 0) {
                throw new BadRequestException(errors);
            }

            return this.usersService.createUser(createUserDto);
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    @Put("edit/:id")
    async editUser(
        @Param("id", ParseIntPipe) id: number,
        @Body(new ValidationPipe({ transform: true })) editUserDto: EditUserDto
    ): Promise<User | ResponseObject> {
        try {
            const validation = new EditUserValidation();

            Object.assign(validation, editUserDto);

            const errors = await validate(validation);

            if (errors.length > 0) {
                throw new BadRequestException(errors);
            }

            return this.usersService.editUser(id, editUserDto);
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseObject> {
        try {
            await this.usersService.deleteUser(id);
            return {
                status: 200,
                message: `User with id ${id} successfully deleted`
            };
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }
}