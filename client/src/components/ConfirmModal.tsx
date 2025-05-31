import React from "react"
import "../styles/App.css"

interface ConfirmModalProps {
    show: boolean
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onCancel} className="delete-button">Anuluj</button>
                    <button onClick={onConfirm} className="delete-button">Usuń</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal