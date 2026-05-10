import { User } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";

export const registerUser = async (req,res) =>{
   try {
    const {name ,email ,password} =req.body;

   const userExists = await User.findOne({
       email: email,
   });

   if(userExists){
    console.log(userExists);
    res.status(400).json({
        message: "User already exist.",
        success:false
    });
    return;
   }

   const hashedPassword = await bcrypt.hash(password,10);
   const newUser =new User({
    name,
    email,
    password:hashedPassword,
   });

   await newUser.save();
  
   res.status(200).json({
    message:"User register successfully..",
    success:true
   });

   } catch (error) {
    res.status(401).json({
        message:"Failed to register...",
        success:false
    })
    console.log(error)
   };
   
};

export const userLogin = async (req, res)=>{
   
   try {
     const{email, password}=req.body;

   if(!email || !password){
    return res.status(400).json({
        message:"email and password must be required...",
        success:false
    })
   };

   const user= await User.findOne({email});
   


   if(!user){
   return res.status(401).json({
        message:"invalid email or password...",
        success:false
    })
   };
   
   const passwordToBeMatched = await bcrypt.compare(password, user.password);

   if(!passwordToBeMatched){
    return res.status(401).json({
        message:"Invalid email or password..",
        success:false
    })
   };

   const accessToken =Jwt.sign(
    {
        userId: user._id,
        name:user.name,
        role: user.role,
    },
    process.env.JWT_ACCESS_TOKEN,
    {expiresIn: "1h"},
   );

   const refreshToken =Jwt.sign(
    {
        userId: user._id,
        name:user.name,
        role: user.role,
    },
    process.env.JWT_REFRESH_TOKEN,
    {expiresIn: "7d"},
   );
   
    res.status(200).json({
      message: "Login successful",
      success: true,
      accessToken,
      refreshToken,
      
    });
   
   } catch (error) {
    res.status(500).json({
        message:"Faild to login..",
        success:false
    });
    console.log(error);
   }
};


export const refreshToken =(req,res)=>{
    const{refreshToken}=req.body;

    if(!refreshToken){
        return res.status(400).json({
            message:"RefreshToken is required..",
            success:false,

        });
    };

     try {
    const decoded = Jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    const newAccessToken = Jwt.sign(
      {
        userId: decoded.userId,
        name: decoded.name,
        role: decoded.role,
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "1h" },
    );

    const newRefreshToken = Jwt.sign(
      {
        userId: decoded.userId,
        name: decoded.name,
        role: decoded.role,
      },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid refresh token",
    });
    console.log(error);
  }
}