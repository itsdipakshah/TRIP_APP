import { Blog } from "../models/blogModel.js";

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      message: "Blogs found successfully",
      success: true,
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// Add blog post

export const addBlog = async (req, res) => {
  try {
    const { title, content, excerpt, bannerUrl, isPublished, publishedDate } =
      req.body;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    if (!title || !content || !excerpt || !bannerUrl) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newBlog = new Blog({
      title,
      content,
      excerpt,
      bannerUrl,
      slug,
      authorId: req.user.userId,
      isPublished: isPublished || false,
      publishedDate: isPublished ? publishedDate || new Date() : null,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding blog", error });
  }
};
// update blog post
export const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, bannerUrl, isPublished, publishedDate } =
      req.body;
    const { id } = req.params;

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (req.user.userId !== existingBlog.authorId.toString()) {
      res.status(403).json({
        message: "You are not authorized to update this blog",
      });
      return;
    }

    existingBlog.title = title || existingBlog.title;
    existingBlog.content = content || existingBlog.content;
    existingBlog.excerpt = excerpt || existingBlog.excerpt;
    existingBlog.bannerUrl = bannerUrl || existingBlog.bannerUrl;
    existingBlog.isPublished =
      isPublished !== undefined ? isPublished : existingBlog.isPublished;
    existingBlog.publishedDate = isPublished
      ? publishedDate || new Date()
      : null;

    await existingBlog.save();
    res.status(200).json({
      message: "Blog updated successfully",
      blog: existingBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

// delete blog post

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBlog = await Blog.findByIdAndDelete(id);

    if (!existingBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (req.user.userId !== existingBlog.authorId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this blog",
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
