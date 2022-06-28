import express from "express";
import UsersController from "../controllers/usersController";

const router = express.Router();

router
    .post("/api/v1/users", UsersController.postUser)
    .get("/api/v1/users/:id", UsersController.getUserById)
    .get("/api/v1/users", UsersController.getUsers)
    .put("/api/v1/users/:id", UsersController.updateUser)
    .delete("/api/v1/users/:id", UsersController.deleteUser)

export default router;