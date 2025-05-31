import {Request, Response} from "express";
import * as userService from "../services/userService"

export const createUserHandler = async (req: Request, res: Response) => {
    try{
        const newUser = await userService.createUser(req.body)
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getAllUsersHandler = async (req: Request, res: Response) => {
    try{
        const users = await userService.getAllUsers()
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try{
        const user = await userService.getUserById(req.params.id)
        if(!user){
            res.status(404).json({message:"No user with this id"})
            return
        }
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const updateUserHandler = async (req: Request, res: Response) => {
    try{
        const updatedUser = await userService.updateUser(req.params.id, req.body)
        if(!updatedUser){
            res.status(404).json({message:"No user with this id"})
            return
        }
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const deleteUserHandler = async (req: Request, res: Response)  => {
    try{
        const deletedUser = await userService.deleteUser(req.params.id)
        if(!deletedUser){
            res.status(404).json({message:"No user with this id"})
            return
        }
        res.status(204).send()
    }
    catch(err){
        res.status(500).json(err)
    }
}