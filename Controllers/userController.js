import bcryptjs from 'bcryptjs';
import { errorHandle } from '../Utils/Error.js';
import User from '../Models/userModel.js';

export const updateUser = async (req, res, next) => {
    const { id } = req.params;

    // Check if the user is authorized to update the profile
    if (req.user.id !== id) {
        return next(errorHandle(403, 'Unauthorized Access To Update The User'));
    }

    // Validate password length
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandle(400, 'Password Must Be At Least 6 Characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Validate username
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 16) {
            return next(errorHandle(400, 'Username Must Be Between 7 And 16 Characters'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandle(400, 'Username Must Not Contain Spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandle(400, 'Username Must Be Lowercase'));
        }
        if (!/^[A-Za-z0-9]+$/.test(req.body.username)) {
            return next(errorHandle(400, 'Username Can Only Contain Letters And Numbers'));
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandle(404, 'User Not Found'));
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async(req,res,next)=>{

  if(req.user.id !== req.params.id){
    return next(403,'You Are Not Allowed To Delete This User')
  }  

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User Deleted Successfully');
  } catch (error) {
    next(error)
  }


}