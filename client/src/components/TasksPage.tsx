import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import ConfirmModal from "./ConfirmModal"

interface Task {
    _id: string
    name: string
    description: string
    project: { name: string }
    user: { name: string; surname: string }
    status: "To do" | "In progress" | "Done"
}

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    // Pobierz zadania
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const res = await axios.get("http://localhost:5000/api/tasks", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTasks(res.data)
            } catch (err) {
                console.error("Błąd przy pobieraniu zadań:", err)
            }
        }

        fetchTasks()
    }, [])

    // Usuwanie zadania
    const handleDelete = (taskId: string) => {
        setSelectedId(taskId)
        setShowModal(true)
    }

    const confirmDelete = async () => {
        if (!selectedId) return

        try {
            const token = localStorage.getItem("jwtToken")
            await axios.delete(`http://localhost:5000/api/tasks/${selectedId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setTasks(tasks.filter(t => t._id !== selectedId))
        } catch (err) {
            alert("Nie udało się usunąć zadania.")
            console.error("Błąd usuwania zadania:", err)
        } finally {
            setShowModal(false)
            setSelectedId(null)
        }
    }

    const cancelDelete = () => {
        setShowModal(false)
        setSelectedId(null)
    }

    // Zmiana statusu zadania
    const handleStatusChange = async (taskId: string, newStatus: Task["status"]) => {
        try {
            const token = localStorage.getItem("jwtToken")
            await axios.put(
                `http://localhost:5000/api/tasks/${taskId}/status`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            setTasks(prev =>
                prev.map(task =>
                    task._id === taskId ? { ...task, status: newStatus } : task
                )
            )

        } catch (err) {
            alert("Nie udało się zmienić statusu zadania.")
            console.error("Błąd zmiany statusu:", err)
        }
    }

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Page-header">
                    <h1>Zadania</h1>
                    <Link to={"/tasks/new"}>
                        <button className={"add-button"}>Dodaj nowe</button>
                    </Link>
                </div>

                <ul>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li key={task._id}>
                                {/* Tooltip z opisem */}
                                <h6 className="task-name-container">
                                    {task.name}
                                    <span className="tooltip">{task.description}</span>
                                </h6>

                                <h5>Projekt: {task.project?.name || "Brak projektu"}</h5>
                                <h5>Osoba: {task.user?.name} {task.user?.surname}</h5>
                                <h5>Status:
                                    <select
                                        value={task.status}
                                        onChange={(e) =>
                                            handleStatusChange(task._id, e.target.value as Task["status"])
                                        }
                                        className="status-select"
                                    >
                                        <option value="To do">Do wykonania</option>
                                        <option value="In progress">W trakcie</option>
                                        <option value="Done">Zakończone</option>
                                    </select>
                                </h5>
                                <div className="list-actions">
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="delete-button"
                                    >
                                        Usuń
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="no-data">Brak zadań</p>
                    )}
                </ul>

                <ConfirmModal
                    show={showModal}
                    message="Czy na pewno chcesz usunąć to zadanie?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            </div>
        </div>
    )
}

export default TasksPage