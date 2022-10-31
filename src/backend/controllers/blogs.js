import express from "express";
import { createBlog, getAllBlogs } from "../models/blogs.js";

const blogController = express.Router();

blogController.post("/create", async(req, res) => {
    // TODO: Validation

    const blog = req.body;

    createBlog(
            blog.blog_title,
            blog.blog_content,
            blog.blog_author,
            blog.login_id,
        )
        .then(() => {
            res.status(200).json({
                status: 200,
                message: " Blog Created",
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to post blog: " + error,
            });
        });
});

blogController.get("/all", (req, res) => {
    getAllBlogs()
        .then(([blogs]) => {
            res.status(200).json({
                status: 200,
                blogs: blogs,
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to get blog list from database",
            });
        });
});

export default blogController;