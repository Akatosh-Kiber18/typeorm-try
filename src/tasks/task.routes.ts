import {Task} from "../entity/Task";
import {Router} from "express";
import {AppDataSource} from "../data-source";
import {List} from "../entity/List";

export const taskRoutes = Router();
const listRepository = AppDataSource.getRepository(List);
const taskRepository = AppDataSource.getRepository(Task);

taskRoutes.put('/tasks/:id', putListHandler);

async function putListHandler(req, res) {
    const list = await listRepository.findOneBy({id: req.body.listId});
    if (!list) {
        return res.sendStatus(400);
    }
    const task = new Task();

    task.id = parseInt(req.params.id);
    task.done = req.body.done || false;
    task.name = req.body.name || null;
    task.due_date = req.body.due_date || null;
    task.list = list;
    task.description = req.body.description || null;

    await taskRepository.save(task);

    return res.json(task)
}
