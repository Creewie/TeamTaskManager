import TeamModel, {ITeam} from "../models/team"

export const createTeam = async (team: {name: string; members: string[]}) => {
    return await TeamModel.create(team)
}

export const getAllTeams = async (): Promise<ITeam[]> => {
    return TeamModel.find().populate("members", "name surname email");
}

export const getTeamById = async (id: string) : Promise<ITeam | null> => {
    return TeamModel.findById(id).populate('members', 'name surname email').populate('projects', 'name description')
}

export const updateTeam = async (id: string, team: Partial<ITeam>) : Promise<ITeam | null> => {
    return TeamModel.findByIdAndUpdate(id, team, {new: true})
}

export const deleteTeam = async (id: string): Promise<ITeam | null> => {
    return TeamModel.findByIdAndDelete(id)
}

export const addMember = async (teamId: string, userId: string): Promise<ITeam | null> => {
    return TeamModel.findByIdAndUpdate(teamId, {$push: {members: userId}}, {new: true})
}

export const removeMember = async (teamId: string, userId: string): Promise<ITeam | null> => {
    return TeamModel.findByIdAndUpdate(teamId, { $pull: { members: userId } }, { new: true });
}