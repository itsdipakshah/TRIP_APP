import express from 'express';

import  { deleteProfile, getProfile, getUsers, updateProfile }  from "../controllers/userController.js";
import { authorization } from '../middlewares/auth.js';

const router = express.Router();

router.get("/users", getUsers);
router.get("/users", authorization,getProfile);
router.patch("/users", authorization,updateProfile);
router.delete("/users", authorization,deleteProfile);

export default router;