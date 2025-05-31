import React, {useEffect, useState} from "react"
import '../styles/App.css'
import axios from "axios"

const CreateTasksPage : React.FC = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [project, setProject] = useState('')
    const [projects, setProjects] = useState<any[]>([])
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low')
    const [status, setStatus] = useState<'To do' | 'In progress' | 'Done'>('To do')

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await axios.get('http://localhost:5000/api/projects')
            setProjects(res.data)
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
            console.log('JWT Payload:', payload)

            const userId = payload.id || payload._id || payload.userId

            if (!userId || typeof userId !== 'string') {
                alert('Wrong User ID in Token')
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

            console.log('Task created!')

        } catch (err) {
            console.error('Error creating task:', err)
            alert('Error creating task:')
        }
    }

    return(
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <div className="Auth-container">
                    <h1>Task creation</h1>
                    <form onSubmit={handleSubmit}>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Task name" required/>
                        <textarea value={description} onChange={e => setDescription(e.target.value)}
                                  placeholder="Description" required/>
                        <select value={project} onChange={e => setProject(e.target.value)} required>
                            <option value="">Select project</option>
                            {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                        </select>
                        <select value={priority} onChange={e => setPriority(e.target.value as any)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <select value={status} onChange={e => setStatus(e.target.value as any)}>
                            <option value="To do">To do</option>
                            <option value="In progress">In progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <button type="submit">Create Task</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTasksPage