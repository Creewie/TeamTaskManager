import mongoose from "mongoose"

const MONGODB_URI = 'mongodb://localhost:27017/teamtaskmanager'

const connectToDB = async () => {
    try{
        await mongoose.connect(MONGODB_URI)
        console.log("Connected to DB")
    }
    catch (error) {
        console.error("MongoDB connection failure: " + error)
        process.exit(1)
    }
}

export default connectToDB