import mongoose, { Schema, Document } from 'mongoose'

export interface IComment extends Document {
    text: string
    task: mongoose.Types.ObjectId
    author: mongoose.Types.ObjectId
}

const CommentSchema = new Schema({
    text: {type: String, required: true},
    task: {type: Schema.Types.ObjectId, ref: "Task", required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
})

const CommentModel =  mongoose.model<IComment>("Comment", CommentSchema)
export default CommentModel