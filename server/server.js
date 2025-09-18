import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/UserRoutes.js'
import imageRouter from './routes/imageRoutes.js'

// App Config
const PORT = process.env.PORT || 4000
const app = express()

await connectDB()

// Initialize Middlewares
app.use(express.json())
app.use(cors())

// API routes
app.get('/', (req, res)=> res.send("API Working"))
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.listen(PORT, ()=> console.log("Server running on port " + PORT))