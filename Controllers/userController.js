import { errorHandle } from '../Utils/Error.js';
import User from '../Models/userModel.js';

export const updateUser = async(req,res,next)=>{

    if(req.user.id !== req.params.userId){
       return next(errorHandle(400,"Unauthorized Access To Update The User"));
    }
    if(req.body.password){
          if(req.body.password.length < 6){
            return next(errorHandle(400,"Password Must Be Atlest 6 Characters"))
          }
    }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 16){
            return next(400,"Username Must Be Netween 7 And 16 Characters")
        }
        if(req.body.username.includes(' ')){
            return next(400,"Username Must Not Contain Spaces")
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(400,"Username Must Be Lowercase")
        }
        if(req.body.username.match(/^[A-Za-z0-9 ]+$/)){
            return next(400,"Username Can Only Contain Letters And Numbers")
        }
    }

    try {

        const updateUser = await User.findByIdAndUpdate(req.params.userId,
            {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture,
            },
        },{
            new:true
        })

        const {password,...rest} = updateUser._doc;
        res.status(200).json(rest);
        
    } catch (error) {
       next(error) 
    }


} 