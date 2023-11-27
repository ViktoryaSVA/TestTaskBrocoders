import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './entities/list.entity';

@Module({
    controllers: [ListController],
    providers: [ListService],
    imports: [
        TypeOrmModule.forFeature([ListEntity])
    ]
})
export class ListModule {}