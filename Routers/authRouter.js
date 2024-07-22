import express from "express";
import { google, logingUser, registerUser } from "../Controllers/userController.js";

const authRoute = express.Router();

authRoute.post('/register-user', registerUser);
authRoute.post('/login-user',logingUser);
authRoute.post('/google',google);

export default authRoute;
