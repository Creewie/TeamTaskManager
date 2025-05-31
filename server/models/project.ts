import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
    name: string,
    description: string,
    team: Schema.Types.ObjectId,
    members: Schema.Types.ObjectId[]
}

const ProjectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    team: {type: Schema.Types.ObjectId, ref: "Team", required: true},
    members: [{type: Schema.Types.ObjectId, ref: "User"}],
})

const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema)
export default ProjectModel