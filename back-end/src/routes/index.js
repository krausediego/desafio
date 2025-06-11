import { Router } from "express";
import { GetTasksController } from "../modules/get-tasks/get-tasks-controller.js";
import { InsertTasksController } from "../modules/insert-task/insert-tasks-controller.js";

const router = new Router({ mergeParams: true });

const getTasks = new GetTasksController();
const insertTasks = new InsertTasksController();

router.get("/get-tasks", getTasks.index.bind(getTasks));

router.post("/insert-tasks", insertTasks.store.bind(insertTasks));

export default router;
