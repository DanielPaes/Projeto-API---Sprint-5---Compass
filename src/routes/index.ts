import express, {Express} from "express";
import users from "./usersRoutes";


const routes = (app: Express) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Curso de node"})
    })


    app.use(
        express.json(),
        users
    )
}

export default routes;