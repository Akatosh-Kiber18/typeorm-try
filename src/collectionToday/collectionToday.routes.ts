import {Task} from "../entity/Task";
import {Router} from "express";
import {AppDataSource} from "../data-source";
import {Between} from "typeorm";
import {List} from "../entity/List";

export const collectionTodayRoutes = Router();
const taskRepository = AppDataSource.getRepository(Task);
const listRepository = AppDataSource.getRepository(List);

collectionTodayRoutes.get('/today', todayTasksHandler)
collectionTodayRoutes.get('/dashboard', todayTasksCountHandler)

async function todayTasksCountHandler(req, res) {
    const date = new Date();

    const todayTasksCount = await listRepository.find({
        relations: ['tasks'],
    })

    const lists = todayTasksCount.map(l => {
        return {
            "id": l.id,
            "name": l.name,
            "undone": l.tasks.filter(t => t.done === false).length
        }
    })
    const today = await taskRepository.count({
        where: {
            dueDate: Between(new Date('1980-01-01'), date),
            done: false
        }
    })

    return res.json({lists , today})
}

async function todayTasksHandler(req, res) {
    const date = new Date();
    const tasks = await taskRepository.find({
        relations: ['list'],
        where: {
            dueDate: Between(new Date('1980-01-01'), date),
            done: false
        },
        order: {
            dueDate: "ASC"
        }
    });
    return res.json(tasks)
}