import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { EditUserDto } from "./dto/edit-user.dto";
import { TodoItem } from "../items/entities/items.entity";
import { ListEntity } from "../list/entities/list.entity";
import { In } from 'typeorm';

@Injectable()
export class UsersService extends TypeOrmCrudService<User>{

    constructor(
        @InjectRepository(User) usersRepository: Repository<User>,
        @InjectRepository(TodoItem)
        private readonly itemRepository: Repository<TodoItem>,
        @InjectRepository(ListEntity)
        private readonly listRepository: Repository<ListEntity>,

    ) {
        super(usersRepository);
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const newUser = new User();
        return this.repo.save({ ...newUser, ...user });
    }

    async editUser(id: number, editUserDto: EditUserDto): Promise<User> {
        const existingUser = await this.repo.findOne({ where: { id: id } });

        if (!existingUser) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        try {
            return await this.repo.save( { ...existingUser, ...editUserDto });
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User with this email already exists.');
            }
            throw error;
        }
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.repo.findOne({ where: { id: id }, relations: ['todoLists'] });

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        const listIds = user.todoLists.map(list => list.id);

        await this.itemRepository.delete({ todoList: { id: In(listIds) } });

        await this.listRepository.delete({ user: { id: id } });

        await this.repo.remove(user);
    }
}