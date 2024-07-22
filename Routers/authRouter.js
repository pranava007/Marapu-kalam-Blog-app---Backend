import express from "express";
import { logingUser, registerUser } from "../Controllers/userController.js";

const authRoute = express.Router();

authRoute.post('/register-user', registerUser);
authRoute.post('/login-user',logingUser)

export default authRoute;
