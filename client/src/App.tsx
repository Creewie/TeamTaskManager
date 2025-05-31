import './styles/App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout.tsx";
import React from "react";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";
import HomePage from "./components/HomePage.tsx";
import TeamsPage from "./components/TeamsPage.tsx";
import ProjectsPage from "./components/ProjectsPage.tsx";
import UsersPage from "./components/UsersPage.tsx";
import TasksPage from "./components/TasksPage.tsx";
import CommentsPage from "./components/CommentsPage.tsx";
import DashboardPage from "./components/DashboardPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CreateTeamsPage from "./components/CreateTeamsPage.tsx";
import CreateProjectsPage from "./components/CreateProjectsPage.tsx";
import CreateCommentsPage from "./components/CreateCommentsPage.tsx";
import CreateTasksPage from "./components/CreateTasksPage.tsx";

const App: React.FC = () => {

  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<ProtectedRoute/>}>
                <Route path="" element={<Layout />}>
                    <Route index element={<HomePage/>}/>
                    <Route path="dashboard" element={<DashboardPage/>}/>
                    <Route path="teams" element={<TeamsPage/>}/>
                    <Route path="/teams/new" element={<CreateTeamsPage/>}/>
                    <Route path="projects" element={<ProjectsPage/>}/>
                    <Route path="/projects/new" element={<CreateProjectsPage/>}/>
                    <Route path="users" element={<UsersPage/>}/>
                    <Route path="tasks" element={<TasksPage/>}/>
                    <Route path="/tasks/new" element={<CreateTasksPage/>}/>
                    <Route path="comments" element={<CommentsPage/>}/>
                    <Route path="/comments/new" element={<CreateCommentsPage/>}/>
                    <Route path="/projects/:id/edit" element={<CreateProjectsPage />} />
                    <Route path="/tasks/:id/edit" element={<CreateTasksPage />} />
                    <Route path="/comments/:id/edit" element={<CreateCommentsPage />} />
                </Route>
            </Route>
        </Routes>
    </Router>
  )
}

export default App