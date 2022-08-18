import {Task} from "../entity/Task";
import {Router} from "express";
import {AppDataSource} from "../data-source";
import {List} from "../entity/List";
import {Between} from "typeorm";

export const collectionTodayRoutes = Router();
const listRepository = AppDataSource.getRepository(List);
const taskRepository = AppDataSource.getRepository(Task);

collectionTodayRoutes.get('/dashboard', dashboardHandler)
// collectionTodayRoutes.get('/collection/today', todayTasksHandler)
// collectionTodayRoutes.get('/lists/:listId/tasks', tasksFromListHandler)

async function dashboardHandler(req, res) {
    const date = new Date();
    const todayTasksCount = await taskRepository.countBy({
        due_date: Between(date, date)
    })
    // const task = await taskRepository.find({
    //     relations: ['list'],
    //     where: {done:false},
    //
    // });

    return res.json({
        "todayTasksCount" :  todayTasksCount
    })
}