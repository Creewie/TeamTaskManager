import mongoose, { Schema, Document } from 'mongoose'

export interface ITask extends Document {
    name: string,
    description: string,
    project: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    priority: "Low" | "Medium" | "High"
    status: "To do" | "In progress" | "Done"
}

const TaskSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    project: {type: Schema.Types.ObjectId, ref: "Project", required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    priority: {type: String, enum: ["Low", "Medium", "High"], default: "Low"},
    status: {type: String, enum: ["To do", "In progress", "Done"], default: "To do"},
})

const TaskModel = mongoose.model<ITask>("Task", TaskSchema)
export default TaskModel