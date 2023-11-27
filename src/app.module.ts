import { UsersController } from "./users/users.controller";
import { config } from 'dotenv';

config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from "./users/users.service";
import { User } from "./users/entities/users.entity";
import { ListController } from "./list/list.controller";
import { ItemsController } from "./items/items.controller";
import { ListService } from "./list/list.service";
import { ItemsService } from "./items/items.service";
import { TodoItem } from "./items/entities/items.entity";
import { ListEntity } from "./list/entities/list.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, TodoItem, ListEntity])],
  controllers: [UsersController, ListController, ItemsController],
  providers: [UsersService, ListService, ItemsService]
})
export class AppModule {}