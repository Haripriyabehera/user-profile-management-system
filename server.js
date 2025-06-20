import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3030
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))