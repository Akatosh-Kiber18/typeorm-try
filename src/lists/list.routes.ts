import {Router} from "express"
import {List} from "../entity/List";
import {AppDataSource} from "../data-source";
import {Task} from "../entity/Task";

export const listRoutes = Router();
const listRepository = AppDataSource.getRepository(List);
const taskRepository = AppDataSource.getRepository(Task);

listRoutes.post('/lists', postListHandler);
listRoutes.get('/lists', getListsHandler);
listRoutes.get('/lists/:id', getListHandler);
listRoutes.patch('/lists/:id', patchListHandler);
listRoutes.delete('/lists/:id', deleteListHandler);

async function postListHandler(req, res) {
    const {name} = req.body

    const list = new List();
    list.name = name;
    await listRepository.save(list)

    return res.json(list)
}

async function getListsHandler(req, res) {
    return res.json(await listRepository.find({relations: ['tasks']}))
}

async function getListHandler(req, res) {
    const id = parseInt(req.params.id);
    if (!id){
        return res.sendStatus(404);
    }
    return res.json(await listRepository.findOneBy({id: id}))
}

async function patchListHandler(req, res) {
    const id = parseInt(req.params.id);
    const list = await listRepository.findOneBy({id: id});
    req.body.id = id;
    Object.assign(list, req.body);
    await listRepository.save(list);

    return res.json(list);
}

async function deleteListHandler(req, res) {
    const id = parseInt(req.params.id);
    const list = await listRepository.findOne({
        relations: ['tasks'],
        where: {id: id}
    });
    if (!list){
        return res.sendStatus(404);
    }
    for (const t of list.tasks) {
        await taskRepository.delete({id: t.id});
    }
    await listRepository.delete({id : list.id});

    return res.json(list);
}
