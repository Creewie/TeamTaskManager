import React, { useEffect, useState } from "react"
import "../styles/App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import ConfirmModal from "./ConfirmModal"

interface Comment {
    _id: string
    text: string
    task: { name: string }
    author: { name: string; surname: string }
}

const CommentsPage: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem("jwtToken")
                const res = await axios.get("http://localhost:5000/api/comments", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setComments(res.data)
            } catch (err) {
                console.error("Błąd przy pobieraniu komentarzy:", err)
            }
        }

        fetchComments()
    }, [])

    const handleDelete = (commentId: string) => {
        setSelectedId(commentId)
        setShowModal(true)
    }

    const confirmDelete = async () => {
        if (!selectedId) return

        try {
            const token = localStorage.getItem("jwtToken")
            await axios.delete(`http://localhost:5000/api/comments/${selectedId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setComments(comments.filter(c => c._id !== selectedId))
        } catch (err) {
            alert("Nie udało się usunąć komentarza.")
            console.error("Błąd usuwania komentarza:", err)
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
                    <h1>Comments</h1>
                    <Link to={"/comments/new"}>
                        <button className={"add-button"}>Add new</button>
                    </Link>
                </div>

                <ul>
                    {comments.map((comment) => (
                        <li key={comment._id}>
                            <h6>{comment.text}</h6>
                            <h5>Autor: {comment.author?.name} {comment.author?.surname}</h5>
                            <h5>Zadanie: {comment.task?.name}</h5>
                            <div className="list-actions">
                                <button
                                    onClick={() => handleDelete(comment._id)}
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
                    message="Czy na pewno chcesz usunąć ten komentarz?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            </div>
        </div>
    )
}

export default CommentsPage