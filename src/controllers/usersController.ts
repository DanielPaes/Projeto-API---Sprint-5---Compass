import { Request, Response } from "express";
import users from "../models/User";

class UsersController{
    static postUser = (req: Request, res: Response) => {
        let user = new users(req.body);
        user.save((err: any) => {
            if(err){
                res.status(501).send({message: `${err.message} - Failed to register user`})
            } else {
                res.status(201).send(user.toJSON())
            }
        })
    }

    static getUsers = (req: Request, res: Response) => {
        users.find((err:any, users) => {
            res.status(200).json(users)
        })
    }

    static getUserForId = (req: Request, res: Response) => {
        const id = req.params.id;
        users.findById(id, (err: any, user:any) =>{
            if(err){
                res.status(400).send({message: `${err.message} - Id not finded`})
            } else {
                res.status(200).send(user);
            }
        })            
    }

    static updateUser = (req: Request, res: Response) => {
        const id = req.params.id;
        users.findByIdAndUpdate(id, {$set: req.body}, (err: any) => {
            if(!err){
                res.status(200).send({message: 'User sucessfully updated'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;
        users.findByIdAndDelete(id, (err:any) => {
            if(!err){
                res.status(200).send({message: 'User successfully deleted'});
            } else {
                res.status(500).send({message: err.message});
            }
        })
    }
}

export default UsersController
