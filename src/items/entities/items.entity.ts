import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ListEntity } from "../../list/entities/list.entity";
@Entity()
export class TodoItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({ default: false })
    isDone: boolean;

    @ManyToOne(() => ListEntity, todoList => todoList.items)
    todoList: ListEntity;

    @Column({ nullable: true })
    user: number;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}