import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true 
    },
    excerpt:{
        type:String,
        required:true
    },
    publishDate:{
         type:Date,
        required:true
    },

    isPublished:{
        type:Boolean,
        default:false
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
})


export const Blog = mongoose.model("Blog", blogSchema);

