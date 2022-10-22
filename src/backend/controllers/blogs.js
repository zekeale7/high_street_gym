import express from "express";
import { getAllBlogs } from "../models/blogs.js";

const blogController = express.Router();

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