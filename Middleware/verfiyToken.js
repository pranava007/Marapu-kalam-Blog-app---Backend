import jwt from 'jsonwebtoken';
import { errorHandle } from '../Utils/Error.js';
import dotenv from "dotenv";

dotenv.config();
export const verfiyToken = (req,res,next)=>{
  
    const token = req.headers.token;
    //console.log(token);
    if (!token) {
      return next(errorHandle(401, 'Unauthorized Access'));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return next(errorHandle(401, 'Unauthorized access' ));
      }
      req.user = user;
      next();
    });

}

// import jwt from 'jsonwebtoken';
// import { errorHandle } from '../Utils/Error.js';
// import dotenv from "dotenv";

// dotenv.config();

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return next(errorHandle(401, 'Unauthorized Access: No token provided'));
//   }

//   const token = authHeader.split(' ')[1];
//   if (!token) {
//     return next(errorHandle(401, 'Unauthorized Access: Invalid token format'));
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       return next(errorHandle(401, 'Unauthorized access: Invalid token'));
//     }
//     req.user = user;
//     next();
//   });
// };
