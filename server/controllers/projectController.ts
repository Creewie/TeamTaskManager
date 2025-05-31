import { Request, Response } from 'express';
import * as projectService from "../services/projectService"

export const createProjectHandler = async (req: Request, res: Response) => {
    try{
        const newProject = await projectService.createProject(req.body)
        res.status(201).json(newProject)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getAllProjectsHandler = async (req: Request, res: Response) => {
    try{
        const projects = await projectService.getAllProjects()
        res.status(200).json(projects)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getProjectByIdHandler = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const project = await projectService.getProjectById(req.params.id)
        if(!project){
            res.status(404).json("No such project ID")
            return
        }
        res.status(200).json(project)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const updateProjectHandler = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const updatedProject = await projectService.updateProject(req.params.id, req.body)
        if(!updatedProject){
            res.status(404).json("No such project ID")
            return
        }
        res.status(200).json(updatedProject)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const deleteProjectHandler = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const deletedProject = await projectService.deleteProject(req.params.id)
        if(!deletedProject){
            res.status(404).json("No such project ID")
            return
        }
        res.status(200).json(deletedProject)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const addMemberHandler = async (req: Request<{ projectId: string, userId: string }>, res: Response) => {
    try{
        const project = await projectService.addMember(req.params.projectId, req.params.userId)
        if(req.params.userId){
            res.status(404).json("No such user ID")
            return
        }
        else if(!req.params.projectId){
            res.status(404).json("No such project ID")
            return
        }
        res.status(200).json(project)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const deleteMemberHandler = async (req: Request<{ projectId: string, userId: string }>, res: Response) => {
    try{
        const project = await projectService.deleteMember(req.params.projectId, req.params.userId)
        if(req.params.userId){
            res.status(404).json("No such user ID")
            return
        }
        else if(!req.params.projectId){
            res.status(404).json("No such project ID")
            return
        }
        res.status(200).json(project)
    }
    catch(err){
        res.status(500).json(err)
    }
}