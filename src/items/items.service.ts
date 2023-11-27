import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from "./dto/create-item.dto";
import { TodoItem } from "./entities/items.entity";
import { ListEntity } from "../list/entities/list.entity";
import { EditItemDto } from "./dto/edit-item.dto";

@Injectable()
export class ItemsService extends TypeOrmCrudService<TodoItem>{
    constructor(
        @InjectRepository(TodoItem) itemsRepository: Repository<TodoItem>,
        @InjectRepository(ListEntity) private readonly listRepository: Repository<ListEntity>,
    ) {
        super(itemsRepository);
    }

    async createItem(item: CreateItemDto): Promise<TodoItem> {
        const listId = item.listId;
        const userId = item.userId;

        const todoList = await this.listRepository.findOne({ where: { id: listId, user: { id: userId } } });

        if (!todoList) {
            throw new NotFoundException(`TodoList with id ${listId} not found`);
        }

        const newToDoItem = new TodoItem();

        newToDoItem.description = item.description;
        newToDoItem.isDone = item.isDone || false;
        newToDoItem.todoList = todoList;
        newToDoItem.createdAt = new Date();
        newToDoItem.updatedAt = new Date();
        newToDoItem.user = userId;

        return this.repo.save(newToDoItem);
    }

    async editItemList(userId: number, itemId: number, listId: number, item: EditItemDto): Promise<TodoItem> {

        const existingItem = await this.repo.findOne({
            where: { id: itemId },
            relations: ['todoList'],
        });

        if (!existingItem) {
            throw new NotFoundException(`TodoItem with id ${itemId} not found`);
        }

        if (existingItem.todoList.id !== Number(listId) || existingItem.user !== Number(userId)) {
            throw new NotFoundException(`TodoItem with id ${itemId} does not belong to list ${listId} or user ${userId}`);
        }

        existingItem.description = item.description;
        existingItem.isDone = item.isDone || false;
        existingItem.updatedAt = new Date();

        return this.repo.save(existingItem);
    }

    async deleteItemList(userId: number, itemId: number, listId: number): Promise<void> {
        const existingItem = await this.repo.findOne({
            where: { id: itemId },
            relations: ['todoList'],
        });

        if (!existingItem) {
            throw new NotFoundException(`TodoItem with id ${itemId} not found`);
        }

        if (
            existingItem.todoList.id !== Number(listId) ||
            existingItem.user !== Number(userId)
        ) {
            throw new NotFoundException(
                `TodoItem with id ${itemId} does not belong to list ${listId} or user ${userId}`,
            );
        }

        await this.repo.remove(existingItem);
    }
}