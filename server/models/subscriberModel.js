import mongoose from "mongoose";

const  subscriberSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        default:"active"
    },
    source:{
        type:String,
        default:"website"
    },
   
});


export const Subscriber = mongoose.model("Subscriber",subscriberSchema);