import { Request, Response } from 'express'
import * as commentService from '../services/commentService'

export const createCommentHandler = async (req: Request, res: Response) => {
    try{
        const newComment = await commentService.createComment(req.body)
        res.status(201).json(newComment)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getAllCommentsHandler = async (req: Request, res: Response) => {
    try{
        const comments = await commentService.getAllComments()
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getCommentByIdHandler = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const comment = await commentService.getCommentById(req.params.id)
        if(!comment){
            res.status(404).json("No such comment ID")
            return
        }
        res.status(200).json(comment)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const updateCommentHandler = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const updatedComment = await commentService.updateComment(req.params.id, req.body)
        if(!updatedComment){
            res.status(404).json("No such comment ID")
            return
        }
        res.status(200).json(updatedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const deleteCommentHandler = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const deletedComment = await commentService.deleteComment(req.params.id)
        if(!deletedComment){
            res.status(404).json("No such comment ID")
            return
        }
        res.status(200).json(deletedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
}