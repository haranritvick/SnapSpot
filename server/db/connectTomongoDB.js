import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(`Error: ${error} in connecting to the data base`)
    }
}

export default connectToDatabase;