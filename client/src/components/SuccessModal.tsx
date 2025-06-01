import React from "react"
import "../styles/App.css"

interface SuccessModalProps {
    message: string
    show: boolean
    onClose: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, show, onClose }) => {
    if (!show) return null

    return (
        <div className="success-modal-overlay">
            <div className="success-modal-content">
                <h3>{message}</h3>
                <button onClick={onClose} className="add-button" style={{ width: "auto", padding: "8px 16px" }}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default SuccessModal