import React, {useEffect, useState} from "react"
import '../styles/App.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import SuccessModal from "./SuccessModal";

const CreateProjectsPage : React.FC = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [team, setTeam] = useState('')
    const [members, setMembers] = useState<string[]>([])
    const [teamMembers, setTeamMembers] = useState<any[]>([])
    const [showSuccess, setShowSuccess] = useState(false)

    const navigate = useNavigate()

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

        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false)
            navigate('/projects')
        }, 2000)
    }

    return (
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <div className="Auth-container">
                    <h1>Tworzenie projektu</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nazwa projektu"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Opis"
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
                        <button type="submit">Stwórz projekt</button>
                    </form>
                </div>
            </div>
            <SuccessModal
                show={showSuccess}
                message="Projekt został stworzony!"
                onClose={() => setShowSuccess(false)}
            />
        </div>
    )
}

export default CreateProjectsPage