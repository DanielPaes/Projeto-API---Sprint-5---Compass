import express from "express";
import UsersController from "../controllers/usersController";

const router = express.Router();

router
    .post("/users", UsersController.postUser)
    .get("/users/:id", UsersController.getUserById)
    .get("/users", UsersController.getUsers)
    .put("/users/:id", UsersController.updateUser)
    .delete("/users/:id", UsersController.deleteUser)

export default router;