import mongoose from "mongoose";


const tripSchema = new mongoose.Schema({
     title:{
        type:String,
        required:true
          },

     discription:{
        type:String,
        required:true
     },
     price:{
        type:Number,
        required:true
     },
     imageUrl:{
        type:String,
        required:true
     },
     duration:{
        type:{
            days:Number,
            nights:Number
         },
         required:true
        },
      startTime:{
        type:Date,
        required:true
      },
      endTime:{
        type:Date,
        required:true
      },
      location:{
        type:String,
        required:true
      },
      maxParticipants:{
        type:Number,
        required:true
      },
      availibleSeats:{
        type:Number,
        required:true
      },
      createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      }
   });

   export const Trip = mongoose.model("Trip", tripSchema);