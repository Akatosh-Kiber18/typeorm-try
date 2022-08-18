import {Task} from "../entity/Task";
import {Router} from "express";
import {AppDataSource} from "../data-source";
import {List} from "../entity/List";

export const taskRoutes = Router();
const listRepository = AppDataSource.getRepository(List);
const taskRepository = AppDataSource.getRepository(Task);

taskRoutes.post('/tasks', postTaskHandler);
taskRoutes.get('/tasks', getTasksHandler);
taskRoutes.get('/tasks/:id', getTaskHandler);
taskRoutes.patch('/tasks/:id', patchTaskHandler);
taskRoutes.delete('/tasks/:id', deleteTaskHandler);
taskRoutes.put('/tasks/:id', putTaskHandler);

async function postTaskHandler(req, res) {
    const {name, due_date, done, description, listId} = req.body

    const task = new Task();
    task.name = name;
    task.due_date = due_date;
    task.done = done;
    task.description = description;
    task.list = listId;
    await taskRepository.save(task)

    return res.json(task)
}

async function getTasksHandler(req, res) {
    return res.json(await taskRepository.find())
}

async function getTaskHandler(req, res) {
    const id = parseInt(req.params.id);
    if (!id){
        return res.sendStatus(404);
    }
    return res.json(await taskRepository.findOneBy({id: id}))
}

async function patchTaskHandler(req, res) {
    const id = parseInt(req.params.id);
    const list = await taskRepository.findOneBy({id: id});
    req.body.id = id;
    Object.assign(list, req.body);
    await taskRepository.save(list);

    return res.json(list);
}

async function deleteTaskHandler(req, res) {
    const id = parseInt(req.params.id);
    const task = await taskRepository.findOneBy({id: id});
    if (!task){
        return res.sendStatus(404);
    }
    await taskRepository.delete({id : task.id});

    return res.json(task);
}

async function putTaskHandler(req, res) {
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
