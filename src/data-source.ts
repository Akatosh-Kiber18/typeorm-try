import "reflect-metadata"
import { DataSource } from "typeorm"
import {List} from "./entity/List";
import {Task} from "./entity/Task";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "todolist_app",
    password: "12345678",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [List,Task],
    migrations: [],
    subscribers: [],
})
