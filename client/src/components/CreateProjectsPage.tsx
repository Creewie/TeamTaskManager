import React, {useEffect, useState} from "react"
import '../styles/App.css'
import axios from "axios"

const CreateProjectsPage : React.FC = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [team, setTeam] = useState('')
    const [members, setMembers] = useState<string[]>([])
    const [teamMembers, setTeamMembers] = useState<any[]>([])

    useEffect(() => {
        const fetchTeam = async () => {
            const token = localStorage.getItem('jwtToken')
            const userId = JSON.parse(atob(token!.split('.')[1])).userId

            const user = await axios.get(`http://localhost:5000/api/users/${userId}`)
            const teamId = user.data.team
            setTeam(teamId)

            const res = await axios.get(`http://localhost:5000/api/teams/${teamId}`)
            setTeamMembers(res.data.members)
        }

        fetchTeam()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await axios.post('http://localhost:5000/api/projects', {
            name,
            description,
            team,
            members
        })

        console.log('Project created!')
    }

    return (
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <div className="Auth-container">
                    <h1>Project creation</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Project name"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                        />
                        <select
                            multiple
                            value={members}
                            onChange={e => {
                                const options = Array.from(e.target.selectedOptions)
                                setMembers(options.map(option => option.value))
                            }}
                            size={Math.min(teamMembers.length, 10)}
                        >
                            {teamMembers.map(member => (
                                <option key={member._id} value={member._id}>
                                    {member.name} {member.surname}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Create Project</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProjectsPage