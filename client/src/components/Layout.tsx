import React from "react";
import NavBar from "./NavBar.tsx";
import {Outlet} from "react-router-dom";
import '../styles/App.css'

const Layout: React.FC = () => {
    return (
        <div className={"Layout-container"}>
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Layout;