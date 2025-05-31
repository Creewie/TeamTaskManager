import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import {Link} from "react-router-dom";

interface Task {
    _id: string
    name: string
    description: string
    project: { _id: string; name: string }
    user: { _id: string; name: string; surname: string }
    priority: "Low" | "Medium" | "High"
    status: "To do" | "In progress" | "Done"
}

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const response = await axios.get("http://localhost:5000/api/tasks", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setTasks(response.data)
            } catch (error) {
                console.error("Error fetching tasks:", error)
            }
        }

        fetchTasks()
    }, [])

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
                            <h5>Assigned to: {task.user?.name} {task.user?.surname}</h5>
                            <h5>Project: {task.project?.name}</h5>
                            <h5>Status: {task.status}</h5>
                            <h5>Priority: {task.priority}</h5>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TasksPage
