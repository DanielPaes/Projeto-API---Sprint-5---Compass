import { Request, Response } from "express";
import tasks from "../models/Task";

class TasksController{
    static postTask = (req: Request, res: Response) => {
        let task = new tasks(req.body);
        task.save((err: any) => {
            if(err){
                res.status(501).send({message: `${err.message} - Failed to register task`})
            } else {
                res.status(201).send(task.toJSON())
            }
        })
    }

    static getTasks = (req: Request, res: Response) => {
        try{
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 3;
            const skip = limit * (page - 1);
            tasks.find((err, tasks) => {
                try{
                    res.status(200).json(tasks);
                }catch(err){
                    console.log(err)
                }                
            }).limit(limit).skip(skip);
        } catch{
        }
}

    static getTaskById = (req: Request, res: Response) => {
        const id = req.params.id;
        tasks.findById(id, (err: any, task:any) =>{
            if(err){
                res.status(404).send({message: `${err.message} - Id not finded`})
            } else {
                res.status(200).send(task);
            }
        })            
    }

    static updateTask = (req: Request, res: Response) => {
        const id = req.params.id;
        tasks.findByIdAndUpdate(id, {$set: req.body}, (err: any) => {
            if(!err){
                res.status(200).send({message: 'Task sucessfully updated'})
            } else {
                res.status(404).send({message: err.message})
            }
        })
    }

    static deleteTask = (req: Request, res: Response) => {
        const id = req.params.id;
        tasks.findByIdAndDelete(id, (err:any) => {
            if(!err){
                res.status(204).send({message: 'Task successfully deleted'});
            } else {
                res.status(404).send({message: err.message});
                
            }
        })
    }
}

export default TasksController
