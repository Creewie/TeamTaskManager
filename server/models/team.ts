import mongoose, { Schema, Document } from 'mongoose'

export interface ITeam extends Document {
    name: string,
    members: mongoose.Types.ObjectId[],
    projects?: mongoose.Types.ObjectId[]
}

const TeamSchema = new Schema({
    name: { type: String, required: true },
    members: [{type: Schema.Types.ObjectId, ref: "User"}],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project", default: [] }]
})

const TeamModel = mongoose.model<ITeam>("Team", TeamSchema)
export default TeamModel