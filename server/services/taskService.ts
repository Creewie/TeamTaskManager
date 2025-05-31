import TaskModel, { ITask } from '../models/task';

export const createTask = async (data: Partial<ITask>): Promise<ITask> => {
    return await TaskModel.create(data)
}

export const getAllTasks = async (): Promise<ITask[]> => {
    return TaskModel.find().populate('project', 'name').populate('user', 'name surname email');
}

export const getTaskById = async (id: string): Promise<ITask | null> => {
    return TaskModel.findById(id).populate('project', 'name').populate('user', 'name surname email').populate('comments', 'text');
}

export const updateTask = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
    return TaskModel.findByIdAndUpdate(id, data, { new: true })
}

export const deleteTask = async (id: string): Promise<ITask | null> => {
    return TaskModel.findByIdAndDelete(id)
}