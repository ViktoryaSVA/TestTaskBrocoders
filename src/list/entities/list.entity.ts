import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from "../../users/entities/users.entity";
import { TodoItem } from "../../items/entities/items.entity";
@Entity()
export class ListEntity {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS'
    })
    id: number;

    @Column({ length: 128, nullable: true })
    title: string;

    @ManyToOne(() => User, user => user.todoLists)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => TodoItem, todoItem => todoItem.todoList, { cascade: true })
    items: TodoItem[];

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}