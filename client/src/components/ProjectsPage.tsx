import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import {Link} from "react-router-dom";

interface Project {
    _id: string
    name: string
    description: string
    team: { _id: string; name: string }
    members: { _id: string; name: string; surname: string }[]
}

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const response = await axios.get("http://localhost:5000/api/projects", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setProjects(response.data)
            } catch (error) {
                console.error("Error fetching projects:", error)
            }
        }

        fetchProjects()
    }, [])

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Page-header">
                    <h1>Projects</h1>
                    <Link to={"/projects/new"}>
                        <button className={"add-button"}>Add new</button>
                    </Link>
                </div>
                <ul>
                    {projects.map((project) => (
                        <li key={project._id}>
                            <h6>{project.name}</h6>
                            <h5>Team: {project.team?.name || "—"}</h5>
                            <h5>{project.members?.map((m) => `${m.name} ${m.surname}`).join(", ") || "—"}</h5>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProjectsPage