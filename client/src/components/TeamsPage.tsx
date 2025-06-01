import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import ConfirmModal from "./ConfirmModal"

interface Team {
    _id: string
    name: string
    members: { _id: string; name: string; surname: string }[]
}

const TeamsPage: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [, setShowTooltipId] = useState<string | null>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const res = await axios.get("http://localhost:5000/api/teams", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTeams(res.data)
            } catch (err) {
                console.error("Błąd przy pobieraniu zespołów:", err)
            }
        }

        fetchTeams()
    }, [])

    const handleDelete = (teamId: string) => {
        setSelectedId(teamId)
        setShowModal(true)
    }

    const confirmDelete = async () => {
        if (!selectedId) return

        try {
            const token = localStorage.getItem("jwtToken")
            await axios.delete(`http://localhost:5000/api/teams/${selectedId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setTeams(teams.filter(t => t._id !== selectedId))
        } catch (err) {
            alert("Nie udało się usunąć zespołu.")
            console.error("Błąd usuwania zespołu:", err)
        } finally {
            setShowModal(false)
            setSelectedId(null)
        }
    }

    const cancelDelete = () => {
        setShowModal(false)
        setSelectedId(null)
    }

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Page-header">
                    <h1>Zespoły</h1>
                    <Link to={"/teams/new"}>
                        <button className={"add-button"}>Stwórz nowy</button>
                    </Link>
                </div>

                <ul>
                    {teams.map((team) => (
                        <li key={team._id}>
                            <h6>{team.name}</h6>

                            {/* Tooltip z członkami */}
                            <div className="task-name-container">
                                <h5
                                    style={{ cursor: "help" }}
                                    onMouseEnter={() => setShowTooltipId(team._id)}
                                    onMouseLeave={() => setShowTooltipId(null)}
                                >
                                    Liczba członków: {team.members.length}
                                </h5>

                                <span className="tooltip">
                    {team.members.length > 0 ? (
                        <ul>
                            {team.members.map((member) => (
                                <li key={member._id}>
                                    {member.name} {member.surname}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        "Brak członków"
                    )}
                </span>
                            </div>

                            <div className="list-actions">
                                <button
                                    onClick={() => handleDelete(team._id)}
                                    className="delete-button"
                                >
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <ConfirmModal
                    show={showModal}
                    message="Czy na pewno chcesz usunąć ten zespół?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            </div>
        </div>
    )
}

export default TeamsPage