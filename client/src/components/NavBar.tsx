import React from "react"
import { Link, useNavigate } from "react-router-dom"
import '../styles/App.css'

const NavBar: React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <nav className={"NavBar-container"}>
            <nav className={"NavBar-panel"}>
                <h1>Mrugacz Project</h1>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/tasks'>Zadania</Link>
                <Link to='/comments'>Komentarze</Link>
                <Link to='/projects'>Projekty</Link>
                <Link to='/teams'>Zespoły</Link>
                <Link to='/users'>Osoby</Link>

                <button onClick={handleLogout} style={{ margin: "50px", width: "150px"}}>
                    Wyloguj
                </button>

                <a>by <Link to={"https://github.com/Creewie"}>Creewie</Link> & <Link to={"https://github.com/Regizz"}>RegiZz</Link></a>
            </nav>
        </nav>
    )
}

export default NavBar
