import {
    BadRequestException,
    Body,
    Controller, Delete,
    NotFoundException,
    Post,
    Put,
    Query,
    ValidationPipe
} from "@nestjs/common";
import { Crud, CrudController } from '@nestjsx/crud';
import { ItemsService } from './items.service';
import { CreateItemDto } from "./dto/create-item.dto";
import { TodoItem } from "./entities/items.entity";
import { EditItemDto } from "./dto/edit-item.dto";
import { EditItemValidation } from "./validation/edit-item.validation";
import { CreateItemValidation } from "./validation/create-item.validation";
import { validate } from 'class-validator';
import { DeleteItemValidation } from "./validation/delete-item.validation";

@Crud({
    model: {
        type: TodoItem,
    },
    dto: {
        create: CreateItemDto,
    },
})
@Controller('items')
export class ItemsController implements CrudController<TodoItem> {
    constructor(public service: ItemsService) {}

    @Post('create')
    async createItem(
        @Body(new ValidationPipe({ transform: true })) createItemDto: CreateItemDto,
    ): Promise<TodoItem | ResponseObject> {
        try {
            const validation = new CreateItemValidation();

            Object.assign(validation, createItemDto);

            const errors = await validate(validation);

            if (errors.length > 0) {
                throw new BadRequestException(errors);
            }

            return this.service.createItem(createItemDto);
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
        @Body() editItemDto: EditItemDto): Promise<TodoItem | ResponseObject> {
        try {
            const { itemId, listId, userId } = query;

            if (!itemId || !listId || !userId) {
                throw new NotFoundException('Required parameters are missing');
            }

            return this.service.editItemList(userId, itemId, listId, editItemDto);
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    @Delete('delete')
    async deleteItem(
        @Query() query: DeleteItemValidation
    ): Promise<ResponseObject> {
        try {
            const { itemId, listId, userId } = query;

            if (!itemId || !listId || !userId) {
                throw new NotFoundException('Required parameters are missing');
            }

            await this.service.deleteItemList(userId, itemId, listId);

            return {
                status: 200,
                message: `Item with id ${itemId} successfully deleted`
            };
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }
}