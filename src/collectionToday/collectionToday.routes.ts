import {Task} from "../entity/Task";
import {Router} from "express";
import {AppDataSource} from "../data-source";
import {Between} from "typeorm";

export const collectionTodayRoutes = Router();
const taskRepository = AppDataSource.getRepository(Task);

collectionTodayRoutes.get('/collection/today', todayTasksHandler)

async function todayTasksHandler(req, res) {
    const date = new Date();
    const tasks = await taskRepository.find({
        relations: ['list'],
        where: {dueDate: Between(date, date)},
    });
    return res.json(tasks)
}