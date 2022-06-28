import express, {Express} from "express";
import users from "./usersRoutes";
import tasks from "./tasksRoutes";


const routes = (app: Express) => {
    app.route('/api/v1').get((req, res) => {
        res.status(200).send({titulo: "Curso de node"})
    })


    app.use(
        express.json(),
        users,
        tasks
    )
}

export default routes;