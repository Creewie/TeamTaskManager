import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import ConfirmModal from "./ConfirmModal"

interface Project {
    _id: string
    name: string
    description: string
    team: { name: string }
}

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    // Pobierz projekty
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const res = await axios.get("http://localhost:5000/api/projects", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setProjects(res.data)
            } catch (err) {
                console.error("Błąd przy pobieraniu projektów:", err)
            }
        }

        fetchProjects()
    }, [])

    // Usuwanie projektu
    const confirmDelete = async () => {
        if (!selectedId) return

        try {
            const token = localStorage.getItem("jwtToken")
            await axios.delete(`http://localhost:5000/api/projects/${selectedId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setProjects(projects.filter(p => p._id !== selectedId))
        } catch (err) {
            alert("Nie udało się usunąć projektu.")
            console.error("Błąd usuwania projektu:", err)
        } finally {
            setShowModal(false)
            setSelectedId(null)
        }
    }

    const handleDeleteClick = (projectId: string) => {
        setSelectedId(projectId)
        setShowModal(true)
    }

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Page-header">
                    <h1>Projekty</h1>
                    <Link to={"/projects/new"}>
                        <button className={"add-button"}>Stwórz nowy</button>
                    </Link>
                </div>

                <ul>
                    {projects.map((project) => (
                        <li key={project._id}>
                            <h6 className="task-name-container">
                                {project.name}
                                <span className="tooltip">{project.description}</span>
                            </h6>
                            <h5>Zespół: {project.team?.name || "Downa"}</h5>
                            <div className="list-actions">
                                <button
                                    onClick={() => handleDeleteClick(project._id)}
                                    className="delete-button">
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Modalka potwierdzająca */}
                <ConfirmModal
                    show={showModal}
                    message="Czy na pewno chcesz usunąć ten projekt?"
                    onConfirm={confirmDelete}
                    onCancel={() => setShowModal(false)}
                />
            </div>
        </div>
    )
}

export default ProjectsPage