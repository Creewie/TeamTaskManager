import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import TaskModel from "../models/task";

export const createTaskHandler = async (req: Request, res: Response) => {
    try{
        const newTask = await taskService.createTask(req.body)
        res.status(201).json(newTask)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getAllTasksHandler = async (req: Request, res: Response) => {
    try{
        const tasks = await taskService.getAllTasks()
        res.status(200).json(tasks)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getTaskByIdHandler = async (req: Request<{id: string}>, res: Response) => {
    try{
        const task = await taskService.getTaskById(req.params.id)
        if(!task){
            res.status(404).json("No such task ID")
            return
        }
        res.status(200).json(task)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const updateTaskHandler = async (req: Request<{id: string}>, res: Response) => {
    try{
        const updatedTask = await taskService.updateTask(req.params.id, req.body)
        if(!updatedTask){
            res.status(404).json("No such task ID")
            return
        }
        res.status(200).json(updatedTask)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )

        res.json(updatedTask)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Błąd serwera" })
    }
}

export const deleteTaskHandler = async (req: Request<{id: string}>, res: Response) => {
    try{
        const deletedTask = await taskService.deleteTask(req.params.id)
        if(!deletedTask){
            res.status(404).json("No such task ID")
            return
        }
        res.status(200).json(deletedTask)
    }
    catch(err){
        res.status(500).json(err)
    }
}