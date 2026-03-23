import express from 'express';

import { getBlogs, updateBlog , addBlog, deleteBlog} from "../controllers/blogController.js";
import { authorization } from '../middlewares/auth.js';

const router = express.Router();

router.get("/blogs", getBlogs);
router.post("/blogs",authorization,  addBlog);
router.patch("/blogs/:id", authorization,updateBlog);
router.delete("/blogs/:id", authorization, deleteBlog);


export default router;