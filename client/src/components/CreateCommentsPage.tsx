import React, {useEffect, useState} from "react"
import '../styles/App.css'
import axios from "axios"

const CreateCommentsPage : React.FC = () => {
    const [text, setText] = useState('')
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState<any[]>([])

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('jwtToken')
            const userId = JSON.parse(atob(token!.split('.')[1])).id

            const res = await axios.get('http://localhost:5000/api/tasks')
            const userTasks = res.data.filter((t: any) => t.user._id === userId)
            setTasks(userTasks)
        }
        fetchTasks()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem('jwtToken')
        const author = JSON.parse(atob(token!.split('.')[1])).id

        await axios.post('http://localhost:5000/api/comments', {
            text,
            task,
            author
        })

        console.log('Comment created!')
    }

    return(
        <div className={"Page-container"}>
            <div className={"Page-panel"}>
                <div className="Auth-container">
                    <h1>Comment creation</h1>
                    <form onSubmit={handleSubmit}>
                        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Comment text"
                                  required/>
                        <select value={task} onChange={e => setTask(e.target.value)} required>
                            <option value="">Select task</option>
                            {tasks.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                        </select>
                        <button type="submit">Create Comment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCommentsPage