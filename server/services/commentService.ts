import CommentModel, { IComment } from '../models/comment'

export const createComment = async (data: IComment): Promise<IComment> => {
    return await CommentModel.create(data)
}

export const getAllComments = async (): Promise<IComment[]> => {
    return CommentModel.find().populate('author', 'name surname email').populate('task', 'name');
}

export const getCommentById = async (id: string): Promise<IComment | null> => {
    return CommentModel.findById(id).populate('author', 'name surname email').populate('task', 'name');
}

export const updateComment = async (id: string, data: Partial<IComment>): Promise<IComment | null> => {
    return CommentModel.findByIdAndUpdate(id, data, { new: true })
}

export const deleteComment = async (id: string): Promise<IComment | null> => {
    return CommentModel.findByIdAndDelete(id)
}