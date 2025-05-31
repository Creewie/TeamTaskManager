import UserModel,  {IUser} from "../models/user"

export const createUser = async (user: IUser) : Promise<IUser> => {
    return await UserModel.create(user)
}

export const getAllUsers = async (): Promise<IUser[]> => {
    return UserModel.find({}).populate("team", "name");
}

export const getUserById = async (id: string): Promise<IUser | null> => {
    return UserModel.findById(id)
}

export const updateUser = async (id: string, user: Partial<IUser>): Promise<IUser | null> => {
    return UserModel.findByIdAndUpdate(id, user, { new: true })
}

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return UserModel.findByIdAndDelete(id)
}