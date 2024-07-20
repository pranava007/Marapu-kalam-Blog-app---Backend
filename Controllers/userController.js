import User from "../Models/userModel.js";
import { errorHandle } from "../Utils/Error.js";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHandle(400, 'All The Fields Are Required'));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashPassword });
    
    try {
        await newUser.save();
        return res.status(200).json({ message: 'User Registered Successfully', result: newUser });
    } catch (error) {
        next(error);
    }
}
