import express from "express";
import { deleteUser, updateUser } from "../Controllers/userController.js";
import { verfiyToken } from "../Middleware/verfiyToken.js";


const router = express.Router();

router.put('/update/:id',verfiyToken,updateUser);
router.delete('/delete/:id',verfiyToken,deleteUser);

export default router;