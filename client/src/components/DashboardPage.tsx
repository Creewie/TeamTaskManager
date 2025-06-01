import React, { useEffect, useState } from "react"
import axios from "axios"
import "../styles/App.css"

interface User {
    _id: string
    name: string
    surname: string
}

interface Task {
    _id: string
    name: string
    status: "To do" | "In progress" | "Done"
    priority: string
}

interface Comment {
    _id: string
    text: string
    task: { name: string }
}

interface Project {
    _id: string
    name: string
}

interface Team {
    _id: string
    name: string
}

const DashboardPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [comments, setComments] = useState<Comment[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [team, setTeam] = useState<Team | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)

            const token = localStorage.getItem("jwtToken")

            const fetchData = async () => {
                try {
                    const [taskRes, commentRes, projectRes, teamRes] = await Promise.all([
                        axios.get("http://localhost:5000/api/tasks", { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get("http://localhost:5000/api/comments", { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get("http://localhost:5000/api/projects", { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get("http://localhost:5000/api/teams", { headers: { Authorization: `Bearer ${token}` } }),
                    ])

                    setTasks(
                        taskRes.data.filter((task: any) =>
                            String(task.user?._id) === String(parsedUser.id)
                        )
                    )

                    setComments(
                        commentRes.data.filter((comment: any) =>
                            String(comment.author?._id) === String(parsedUser.id)
                        )
                    )

                    setProjects(
                        projectRes.data.filter((project: any) =>
                            project.members?.some((m: any) => String(m._id) === String(parsedUser.id))
                        )
                    )

                    const foundTeam = teamRes.data.find((team: any) =>
                        team.members?.some((m: any) => String(m._id) === String(parsedUser.id))
                    )
                    setTeam(foundTeam || null)

                } catch (err) {
                    console.error("Error fetching dashboard data", err)
                }
            }

            fetchData().then(r => console.log(r))
        }
    }, [])

    const tasksByStatus = {
        todo: tasks.filter(t => t.status === "To do"),
        inProgress: tasks.filter(t => t.status === "In progress"),
        done: tasks.filter(t => t.status === "Done")
    }

    const getTaskClasses = (task: Task) => {
        const statusClass = task.status.toLowerCase().replace(/\s/g, '-')
        const priorityClass = task.priority.toLowerCase()

        return `kanban-task ${statusClass} ${priorityClass}`;
    };

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <h1 id="dashboard-h1">{user ? `Witaj, ${user.name} ${user.surname} !` : "Witaj, pracowniku!"}</h1>
                <div className="Dashboard-container">
                    <div className="Kanban-container">
                        <h2>Statusy zadań</h2>
                        <div className="kanban-board">
                            <div className="kanban-column">
                                <h3>Do zrobienia</h3>
                                {tasksByStatus.todo.map(task => (
                                    <div key={task._id} className={getTaskClasses(task)}>
                                        {task.name}
                                    </div>
                                ))}
                            </div>
                            <div className="kanban-column">
                                <h3>W trakcie</h3>
                                {tasksByStatus.inProgress.map(task => (
                                    <div key={task._id} className={getTaskClasses(task)}>
                                        {task.name}
                                    </div>
                                ))}
                            </div>
                            <div className="kanban-column">
                                <h3>Zakończone</h3>
                                {tasksByStatus.done.map(task => (
                                    <div key={task._id} className={getTaskClasses(task)}>
                                        {task.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="Dashboard-columns">
                        <div className="Dashboard-column">
                            <h2>Twoje komentarze</h2>
                            <ul>
                                {comments.map(comment => (
                                    <li key={comment._id} className="comment-item">
                                        {comment.text}
                                        <span style={{ color: "#808080"}}>
                                            Zadanie: {comment.task?.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="Dashboard-column">
                            <h2>Twoje projekty</h2>
                            <ul>
                                {projects.map(project => (
                                    <li key={project._id} className="comment-item">{project.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="Dashboard-column">
                            <h2>Twój zespół</h2>
                            <ul>
                                <li className="comment-item">{team ? team.name : "Downa"}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;