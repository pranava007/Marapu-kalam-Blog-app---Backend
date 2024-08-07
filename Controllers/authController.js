import User from "../Models/userModel.js";
import { errorHandle } from "../Utils/Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// register
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandle(400, "All The Fields Are Required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    return res
      .status(200)
      .json({ message: "User Registered Successfully", result: newUser });
  } catch (error) {
    next(error);
  }
};

// login
export const logingUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandle(4000, "All the Fields Are Required"));
  }

  try {
    const userDetails = await User.findOne({ email });

    const userPassword = bcryptjs.compareSync(password, userDetails.password);

    if (!userDetails || !userPassword) {
      return next(errorHandle(400, "Invalid Credentials"));
    }
    const token = jwt.sign(
      { id: userDetails._id, isAdmin: userDetails.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    // password hidden not store db
    const { password: passkey, ...rest } = userDetails._doc;

    res
      .status(200)
      .json({ message: "User LoggedIn Successfully", rest, token });
  } catch (error) {
    next(error);
  }
};

// OAuth

export const google = async (req, res, next) => {
  const { email, name, profilePic } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin:user.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      // password hidden not store db
      const { password: passkey, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_Token", token, {
          // httpOnly: true,
        })
        .json({ message: "User LoggedIn Successfully", rest,token });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: profilePic,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      // password hidden not store db
      const { password: passkey, ...rest } = newUser._doc;

      res
        .status(200)
        .json({ message: "User LoggedIn Successfully", rest, token });
    }
  } catch (error) {
    next(error);
  }
};
