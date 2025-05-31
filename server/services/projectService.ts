import ProjectModel, { IProject } from '../models/project';

export const createProject = async (project: IProject): Promise<IProject> => {
    return ProjectModel.create(project)
}

export const getAllProjects = async (): Promise<IProject[]> => {
    return ProjectModel.find().populate('team', 'name').populate('members', 'name surname email')
}

export const getProjectById = async (id: string): Promise<IProject | null> => {
    return ProjectModel.findById(id).populate('team', 'name').populate('members', 'name email').populate('tasks', 'title')
}

export const updateProject = async (id: string, data: Partial<IProject>): Promise<IProject | null> => {
    return ProjectModel.findByIdAndUpdate(id, data, { new: true })
}

export const deleteProject = async (id: string): Promise<IProject | null> => {
    return ProjectModel.findByIdAndDelete(id)
}

export const addMember = async (projectId: string, userId: string): Promise<IProject | null> => {
    return ProjectModel.findByIdAndUpdate(projectId, { $push: { members: userId } }, { new: true })
}

export const deleteMember = async (projectId: string, userId: string): Promise<IProject | null> =>{
    return ProjectModel.findByIdAndUpdate(projectId, { $pull: { members: userId } }, { new: true })
}