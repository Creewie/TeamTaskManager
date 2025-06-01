import React, { useState } from "react"
import '../styles/App.css'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const RegisterPage : React.FC = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                surname,
                email,
                password
            })

            setSuccess(response.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (err: any) {
            console.error('Błąd rejestracji:', err.response?.data || err.message)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            } else if (err.response && err.response.data && err.response.data.errors) {
                setError(err.response.data.errors[0].msg || 'Bład przy tworzeniu konta')
            } else {
                setError('Problem tworząc konto')
            }
        }
    }

    return(
        <div className={"Auth-container"}>
            <h1>Mrugacz Project</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id={"registerPage-name"}
                    type={"text"}
                    placeholder={"Imię"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    id={"registerPage-surname"}
                    type={"text"}
                    placeholder={"Nazwisko"}
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <input
                    id={"registerPage-email"}
                    type={"email"}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    id={"registerPage-password"}
                    type={"password"}
                    placeholder={"Hasło"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button id={"registerPage-submit"} type={"submit"}>Stwórz konto</button>
            </form>
            {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
            {success && <p className="success-message" style={{color: 'green'}}>{success}</p>}
            <p>Masz już konto? Przejdź <Link to={"/login"}>tutaj</Link></p>
        </div>
    )
}

export default RegisterPage