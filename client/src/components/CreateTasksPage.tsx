import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import SuccessModal from "./SuccessModal"

const CreateTasksPage: React.FC = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [project, setProject] = useState('')
    const [projects, setProjects] = useState<any[]>([])
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low')
    const [status, setStatus] = useState<'To do' | 'In progress' | 'Done'>('To do')
    const [showSuccess, setShowSuccess] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects')
                setProjects(res.data)
            } catch (err) {
                console.error("Błąd przy pobieraniu projektów:", err)
            }
        }

        fetchProjects()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem('jwtToken')

        if (!token) {
            alert('Brak tokenu autoryzacyjnego!')
            return
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const userId = payload.id || payload._id || payload.userId

            if (!userId || typeof userId !== 'string') {
                alert('Nieprawidłowe ID użytkownika')
                return
            }

            await axios.post('http://localhost:5000/api/tasks', {
                name,
                description,
                project,
                user: userId.trim(),
                priority,
                status,
            })

            setShowSuccess(true)

            setTimeout(() => {
                setShowSuccess(false)
                navigate('/tasks')
            }, 2000)

        } catch (err) {
            console.error('Błąd przy tworzeniu zadania:', err)
            alert('Nie udało się utworzyć zadania')
        }
    }

    return (
        <div className="Page-container">
            <div className="Page-panel">
                <div className="Auth-container">
                    <h1>Tworzenie zadania</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nazwa zadania"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Opis"
                            required
                        />
                        <select
                            value={project}
                            onChange={e => setProject(e.target.value)}
                            required
                        >
                            <option value="">Zaznacz projekt</option>
                            {projects.map(p => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={priority}
                            onChange={e => setPriority(e.target.value as any)}
                        >
                            <option value="Low">Niski priorytet</option>
                            <option value="Medium">Średni priorytet</option>
                            <option value="High">Wysoki priorytet</option>
                        </select>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value as any)}
                        >
                            <option value="To do">Do zrobienia</option>
                            <option value="In progress">W trakcie</option>
                            <option value="Done">Zakończone</option>
                        </select>
                        <button type="submit">Stwórz</button>
                    </form>
                </div>
            </div>

            {/* Okienenko sukcesu */}
            <SuccessModal
                show={showSuccess}
                message="Zadanie zostało dodane!"
                onClose={() => setShowSuccess(false)}
            />
        </div>
    )
}

export default CreateTasksPage