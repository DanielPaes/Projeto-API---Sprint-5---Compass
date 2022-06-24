import express from "express";
import TasksController from "../controllers/tasksController";

const router = express.Router();

router
     .post("/tasks", TasksController.postTask)
     .get("/tasks/:id", TasksController.getTaskById)
     .get("/tasks", TasksController.getTasks)
     .put("/tasks/:id", TasksController.updateTask)
     .delete("/tasks/:id", TasksController.deleteTask)

export default router;