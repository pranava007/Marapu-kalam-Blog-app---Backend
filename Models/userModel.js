import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/3106/3106921.png"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isUser:{
        type:Boolean,
        default:true, 
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
