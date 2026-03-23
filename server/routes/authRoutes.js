import express from "express";
import { refreshToken, registerUser, userLogin } from "../controllers/authControllers.js";


const router =express.Router();

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/refresh-token',refreshToken );


export default router;
