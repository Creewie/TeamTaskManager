import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import ConfirmModal from "./ConfirmModal"

interface Task {
    _id: string
    name: string
    project: { name: string }
    user: { name: string; surname: string }
}

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)

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

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Page-header">
                    <h1>Tasks</h1>
                    <Link to={"/tasks/new"}>
                        <button className={"add-button"}>Add new</button>
                    </Link>
                </div>

                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <h6>{task.name}</h6>
                            <h5>Project: {task.project?.name}</h5>
                            <h5>User: {task.user?.name} {task.user?.surname}</h5>
                            <div className="list-actions">
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
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