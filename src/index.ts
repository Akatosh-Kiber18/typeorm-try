import {AppDataSource} from "./data-source"

import express from "express";
import {listRoutes} from "./lists/list.routes";
import {taskRoutes} from "./tasks/task.routes";

const app = express();

const PORT = 3000;

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(express.json());
app.use(logRequest);
app.use(listRoutes);
app.use(taskRoutes);

AppDataSource.initialize().then(() => {
    app.listen(PORT, () => console.log('Server started on port: ' + PORT));
}).catch(error => console.log(error))
