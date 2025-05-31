import mongoose, {Schema, Document} from "mongoose"
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string
    surname: string
    email: string
    password: string
    team: mongoose.Types.ObjectId
    role: 'Admin' | 'User'
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    team: {type: Schema.Types.ObjectId, ref: "Team"},
    role: {type: String, enum: ["Admin", "User"], default: "User"}
})

UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password!, salt)
    next()
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
};

const UserModel = mongoose.model<IUser>("User", UserSchema)
export default UserModel