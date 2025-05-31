import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreateCommentsPage: React.FC = () => {
    const [text, setText] = useState('')
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    // Pobierz zadania użytkownika
    useEffect(() => {
        const fetchUserTasks = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                if (!token) throw new Error("Brak tokenu")

                // Dekoduj payload JWT
                const payload = JSON.parse(atob(token.split('.')[1]))
                const userId = payload.id || payload._id || payload.userId
                if (!userId) throw new Error("Brak ID użytkownika w tokenie")

                // Pobierz zadania
                const res = await axios.get("http://localhost:5000/api/tasks", {
                    headers: { Authorization: `Bearer ${token}` }
                })

                // Filtruj zadania dla użytkownika
                const userTasks = res.data.filter((t: any) =>
                    t.user?._id === userId || t.user?.toString() === userId
                )

                if (userTasks.length === 0) {
                    setError("Nie masz żadnych zadań.")
                }

                setTasks(userTasks)
            } catch (err) {
                console.error("Błąd przy pobieraniu zadań:", err)
                setError("Nie udało się pobrać zadań.")
            } finally {
                setLoading(false)
            }
        }

        fetchUserTasks()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!text.trim()) {
            alert("Komentarz nie może być pusty!")
            return
        }

        if (!task) {
            alert("Wybierz zadanie!")
            return
        }

        try {
            const token = localStorage.getItem("jwtToken")
            const payload = JSON.parse(atob(token!.split(".")[1]))
            const authorId = payload.id || payload._id || payload.userId

            await axios.post(
                "http://localhost:5000/api/comments",
                {
                    text,
                    task,
                    author: authorId
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            alert("Komentarz został dodany!")

            // Przejdź do listy komentarzy
            navigate("/comments")
        } catch (err) {
            console.error("Błąd przy tworzeniu komentarza:", err)
            alert("Nie udało się dodać komentarza.")
        }
    }

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Auth-container">
                    <h1>Comment creation</h1>

                    {loading ? (
                        <p>Loading tasks...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Comment text"
                                required
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: "#2f3640",
                                    color: "white",
                                    resize: "none"
                                }}
                            />

                            <select
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                required
                                style={{
                                    margin: "10px 0",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: "#2f3640",
                                    color: "white"
                                }}
                            >
                                <option value="">Select task</option>
                                {tasks.map((t) => (
                                    <option key={t._id} value={t._id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>

                            <button type="submit">Create Comment</button>
                        </form>
                    )}

                    {!loading && tasks.length === 0 && !error && (
                        <p>You don't have any tasks assigned.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateCommentsPage