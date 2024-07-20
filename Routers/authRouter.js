import express from "express";
import { registerUser } from "../Controllers/userController.js";

const authRoute = express.Router();

authRoute.post('/register-user', registerUser);

export default authRoute;
