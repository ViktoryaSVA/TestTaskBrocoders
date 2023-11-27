import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ListEntity } from "../../list/entities/list.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS'
    })
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => ListEntity, todoList => todoList.user)
    todoLists: ListEntity[];
}