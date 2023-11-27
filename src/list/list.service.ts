import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from "./dto/create-list.dto";
import { ListEntity } from "./entities/list.entity";
import { User } from "../users/entities/users.entity";
import { EditListDto } from "./dto/edit-list.dto";
import { TodoItem } from "../items/entities/items.entity";

@Injectable()
export class ListService extends TypeOrmCrudService<ListEntity>{
    constructor(
        @InjectRepository(ListEntity) listRepository: Repository<ListEntity>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(TodoItem)
        private readonly itemRepository: Repository<TodoItem>,

    ) {
        super(listRepository);
    }

    async createToDoList(list: CreateListDto): Promise<ListEntity> {
        const userId = Number(list.userId);
        const user = await this.userRepository.findOne({where: {id: userId}});

        if (!user) {
            throw new NotFoundException(`User with id ${list.userId} not found`);
        }

        const newToDoList = new ListEntity();
        newToDoList.title = list.title;
        newToDoList.createdAt = new Date();
        newToDoList.updatedAt = new Date();
        newToDoList.user = user;

        return this.repo.save(newToDoList);
    }

    async editToDoList(userId: number, listId: number, list: EditListDto): Promise<ListEntity> {
        const user = await this.userRepository.findOne({where: {id: userId}});

        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const todoList = await this.repo.findOne({ where: { id: listId, user: { id: userId } } });

        if (!todoList) {
            throw new NotFoundException(`TodoList with id ${listId} not found for user with id ${userId}`);
        }

        todoList.title = list.title;
        todoList.updatedAt = new Date();

        return this.repo.save(todoList);
    }

    async deleteList(userId: number, listId: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId }});
        const list = await this.repo.findOne({
            where: {id: listId},
            relations: ['items']
        });

        if (!user || !list) {
            throw new NotFoundException('User or List not found');
        }

        if (user.id !== Number(userId)) {
            throw new NotFoundException(`List with id ${listId} does not belong to user ${userId}`);
        }

        const itemIdsToDelete = list.items.map(item => item.id);

        if (itemIdsToDelete.length > 0) {
            await this.itemRepository.delete(itemIdsToDelete);
        }

        await this.repo.delete(listId);
    }

    async findAllListsForUser(userId: number): Promise<ListEntity[]> {
        return await this.repo.find({
            where: { user: { id: userId } },
            relations: ['items'],
        });
    }
}