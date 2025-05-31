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
                <Link to='/dashboard'>My dashboard</Link>
                <Link to='/teams'>Teams</Link>
                <Link to='/projects'>Projects</Link>
                <Link to='/users'>Users</Link>
                <Link to='/tasks'>Tasks</Link>
                <Link to='/comments'>Comments</Link>

                <button
                    onClick={handleLogout}
                    style={{ margin: "50px", width: "150px"}}
                >
                    Log me out
                </button>

                <a><Link to={"https://github.com/Creewie"}>by Creewie</Link></a>
            </nav>
        </nav>
    )
}

export default NavBar
