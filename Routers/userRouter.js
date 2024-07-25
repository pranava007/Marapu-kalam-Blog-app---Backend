import express from "express";
import { updateUser } from "../Controllers/userController.js";
import { middleWare } from "../Middleware/MiddleWare.js";


const router = express.Router();

router.put('/update/:id',middleWare,updateUser)

export default router;