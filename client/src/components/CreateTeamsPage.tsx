import React, { useEffect, useState } from "react"
import '../styles/App.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"

interface User {
    _id: string
    name: string
    surname: string
    team?: string | null
}

const CreateTeamsPage: React.FC = () => {
    const [teamName, setTeamName] = useState("")
    const [users, setUsers] = useState<User[]>([])
    const [selectedMembers, setSelectedMembers] = useState<string[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get<User[]>("http://localhost:5000/api/users")
            const noTeamUsers = response.data.filter(user => !user.team)
            setUsers(noTeamUsers)
        }
        fetchUsers()
    }, [])

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:5000/api/teams", {
                name: teamName,
                members: selectedMembers
            })

            navigate("/team")
        } catch (error) {
            console.error("Failed to create team:", error)
        }
    }

    return (
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <div className="Auth-container">
                    <h1>Team creation</h1>
                    <input
                        id="create-team-name"
                        type="text"
                        placeholder="Team name"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                    />
                    <select
                        multiple
                        value={selectedMembers}
                        onChange={e => {
                            const options = Array.from(e.target.selectedOptions)
                            setSelectedMembers(options.map(option => option.value))
                        }}
                        size={Math.min(users.length, 10)}
                    >
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.name} {user.surname}
                            </option>
                        ))}
                    </select>
                    <button
                        id="create-team-btn"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Create Team
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTeamsPage