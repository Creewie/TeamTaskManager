import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"

interface User {
    _id: string
    name: string
    surname: string
    email: string
    team: { _id: string; name: string }
    role: "Admin" | "User"
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const response = await axios.get("http://localhost:5000/api/users", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUsers(response.data)
            } catch (error) {
                console.error("Błąd wczytując użytkowników: ", error)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Page-header">
                    <h1>Osoby</h1>
                </div>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <h6>{user.name} {user.surname}</h6>
                            <h5>Zespół: {user.team?.name || "Jobless"}</h5>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UsersPage
