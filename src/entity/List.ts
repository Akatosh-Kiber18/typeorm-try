import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Task} from "./Task";

@Entity()
export class List {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @OneToMany(() => Task, (task) => task.list)
    tasks: Task[]
}