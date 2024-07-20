import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import authRoute from './Routers/authRouter.js'




dotenv.config()

const app = express();

app.use(cors({
  origin:'*',
  credentials:true,
}))

app.use(express.json())

//error handler
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

connectDB();

app.get('/',(req,res)=>{
    console.log("Welcom to the API");
})

// API Router

app.use("/api/auth",authRoute)


app.listen(process.env.PORT,()=>{
    console.log("Server is running on port");
})