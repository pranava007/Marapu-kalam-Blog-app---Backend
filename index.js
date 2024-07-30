import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import authRoute from './Routers/authRouter.js';
import userRoute from './Routers/userRouter.js';
import cookieParser from "cookie-parser";
import postRouter from "./Routers/postRouter.js";
dotenv.config()

const app = express();

app.use(cors({
  origin:'*',
  credentials:true,
}))

app.use(express.json())
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});


connectDB();

app.get('/',(req,res)=>{
    res.status(200).send('App Run Successfully')
})

//API Router

//Auth Router
app.use("/api/auth",authRoute);

//User Router
app.use("/api/user",userRoute);

//Post Router
app.use("/api/post",postRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port");
})