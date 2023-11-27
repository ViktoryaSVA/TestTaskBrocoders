import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from './entities/items.entity';
import { ItemsService } from "./items.service";

@Module({
    controllers: [ItemsController],
    providers: [ItemsService],
    imports: [
        TypeOrmModule.forFeature([TodoItem])
    ]
})
export class ItemsModule {}