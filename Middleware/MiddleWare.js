import jwt from 'jsonwebtoken';
import { errorHandle } from '../Utils/Error.js';
import dotenv from "dotenv";

dotenv.config();
export const middleWare = (req,res,next)=>{
    const token = req.cookies.access_Token;
    if(!token){
        return next(errorHandle(401,'Unauthorized Access'))
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user))
    if(err){
        return next(errorHandle(401,'Unauthorized Access'));
    }
    req.user = user;
    next()

}