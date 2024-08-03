import express from "express";
import { verfiyToken } from "../Middleware/verfiyToken.js";
import { createPost, getAllPost } from "../Controllers/postController.js";


const router = express.Router();

router.post('/createpost',createPost)
router.get('/getpost',getAllPost)



export default router