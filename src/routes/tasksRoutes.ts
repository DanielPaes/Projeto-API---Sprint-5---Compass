import express from "express";
import TasksController from "../controllers/tasksController";

const router = express.Router();

router
     .post("/api/v1/tasks", TasksController.postTask)
     .get("/api/v1/tasks/:id", TasksController.getTaskById)
     .get("/api/v1/tasks", TasksController.getTasks)
     .put("/api/v1/tasks/:id", TasksController.updateTask)
     .delete("/api/v1/tasks/:id", TasksController.deleteTask)

export default router;