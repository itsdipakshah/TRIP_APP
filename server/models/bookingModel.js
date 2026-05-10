import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    tripId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Trip',
        required:true
    },
    numberOfPeople:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','confirmed','cancelled'],
        default:'pending'
    },
    bookingDate:{
        type:Date,
        default:Date.now,
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});


export const Booking = mongoose.model('Booking',bookingSchema);