import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    ValidationPipe
} from "@nestjs/common";
import { Crud } from '@nestjsx/crud';
import { ListService } from './list.service';
import { ListEntity } from "./entities/list.entity";
import { CreateListDto } from "./dto/create-list.dto";
import { EditListDto } from "./dto/edit-list.dto";
import { EditItemValidation } from "./validation/edit-list.validation";
import { CreateListValidation } from "./validation/create-list.validation";
import { validate } from "class-validator";
import { DeleteListValidation } from "./validation/delete-list.validation";

@Crud({
    model: {
        type: ListEntity
    }
})
@Controller('list')
export class ListController {

    constructor(private readonly listService: ListService) {}

    @Post('create')
    async createToDoList(
        @Body(new ValidationPipe({ transform: true })) createToDoListDto: CreateListDto,
    ): Promise<ListEntity | ResponseObject> {
        try {
            const validation = new CreateListValidation();

            Object.assign(validation, createToDoListDto);

            const errors = await validate(validation);

            if (errors.length > 0) {
                throw new BadRequestException(errors);
            }

            return this.listService.createToDoList(createToDoListDto);
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    @Put('edit')
    async editToDoList(
        @Query() query: EditItemValidation,
        @Body() editToDoListDto: EditListDto): Promise<ListEntity | ResponseObject> {
        try {
            const { listId, userId } = query;

            if (!listId || !userId) {
                throw new NotFoundException('Required parameters are missing');
            }

            return this.listService.editToDoList(userId, listId, editToDoListDto);
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    @Delete('delete')
    async deleteList(
        @Query() query: DeleteListValidation
    ): Promise<ResponseObject> {
        try {
            const { listId, userId } = query;

            await this.listService.deleteList(userId, listId);

            return {
                status: 200,
                message: `List with id ${listId} successfully deleted`
            };
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    @Get(':userId')
    async findAllListsForUser(@Param('userId') userId: number): Promise<ListEntity[] | ResponseObject> {
        try {
            return this.listService.findAllListsForUser(userId);
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }
}