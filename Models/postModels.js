import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
        unique:true,
    },
    image:{
        type:String,
        default:"https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-1030x584.png"
    },
    category:{
        type:String,
        default:'uncategorized'
    },
   
},
{timestamps:true}
)

const Postblog = mongoose.model('Post',postSchema);
export default Postblog;