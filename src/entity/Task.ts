import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from "typeorm"
import {List} from "./List";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    due_date: Date

    @Column()
    done: boolean = false

    @Column({nullable: true})
    description: string

    @JoinColumn()
    @ManyToOne(() => List, {nullable: false})
    list: List
}