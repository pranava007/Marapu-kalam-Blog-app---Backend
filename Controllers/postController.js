import Postblog from "../Models/postModels.js";
import { errorHandle } from "../Utils/Error.js";

export const createPost = async(req,res,next)=>{

    if(!req.user.isUser){
        console.log(isUser);
        
        return next(errorHandle(403,'You Are Not Allowed To Create A Post'))
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandle(400,'All The Fields Are Required'))
    }

    const {title,content,image,category} = req.body;
    const newPost = new Postblog({title,content,image,category})
    try {
        
        const savePost = await newPost.save();
        res.status(200).json({message:'Post Create Successfully',result:savePost})

    } catch (error) {
        next(error)
    }


}

export const getAllPost = async(req,res,next)=>{
    try {
        const posts = await Postblog.find();
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}