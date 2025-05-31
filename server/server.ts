import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDB from "./config/database"
import userRoutes from "./routes/users"
import teamRoutes from "./routes/teams"
import projectRoutes from "./routes/projects"
import taskRoutes from "./routes/tasks"
import commentRoutes from "./routes/comments"
import authRoutes from './routes/auths';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

connectToDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);

app.use("/api/users", userRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/comments", commentRoutes)

app.get("/", (req, res) => {
    res.send("Api is currently working")
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})