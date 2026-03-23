import express from 'express';

import  { deleteProfile, getProfile, getUsers, updateProfile }  from "../controllers/userController.js";
import { authorization } from '../middlewares/auth.js';

const router = express.Router();

router.get("/users", getUsers);
router.get("/profile", authorization,getProfile);
router.patch("/profile/:id", authorization,updateProfile);
router.delete("/users/:id", authorization,deleteProfile);

export default router;