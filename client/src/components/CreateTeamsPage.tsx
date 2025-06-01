import React, { useEffect, useState } from "react"
import "../styles/App.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import SuccessModal from "./SuccessModal"

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
    const [showSuccess, setShowSuccess] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const res = await axios.get<User[]>("http://localhost:5000/api/users", {
                    headers: { Authorization: `Bearer ${token}` }
                })

                const noTeamUsers = res.data.filter(user => !user.team)
                setUsers(noTeamUsers)
            } catch (err) {
                console.error("Błąd przy pobieraniu użytkowników:", err)
            }
        }

        fetchUsers()
    }, [])

    const handleSubmit = async () => {
        if (!teamName || selectedMembers.length === 0) {
            alert("Podaj nazwę zespołu i wybierz członków.")
            return
        }

        try {
            await axios.post(
                "http://localhost:5000/api/teams",
                {
                    name: teamName,
                    members: selectedMembers
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
                }
            )

            setShowSuccess(true)

            setTimeout(() => {
                setShowSuccess(false)
                navigate("/teams")
            }, 1500)

        } catch (error) {
            console.error("Nie udało się utworzyć zespołu:", error)
        }
    }

    return (
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <div className="Auth-container">
                    <h1>Tworzenie zespołu</h1>
                    <input
                        id="create-team-name"
                        type="text"
                        placeholder="Nazwa zespołu"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <select
                        multiple
                        value={selectedMembers}
                        onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions).map(o => o.value)
                            setSelectedMembers(options)
                        }}
                        size={Math.min(users.length, 10)}
                    >
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name} {user.surname}
                            </option>
                        ))}
                    </select>
                    <button
                        id="create-team-btn"
                        onClick={handleSubmit}
                    >
                        Utwórz zespół
                    </button>
                </div>
            </div>

            <SuccessModal
                show={showSuccess}
                message="Zespół został pomyślnie utworzony!"
                onClose={() => setShowSuccess(false)}
            />
        </div>
    )
}

export default CreateTeamsPage