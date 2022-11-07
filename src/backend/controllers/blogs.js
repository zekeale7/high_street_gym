import express from "express";
import { createBlog, deleteBlogByID, getAllBlogs, getBlogByID, updateBlogByID } from "../models/blogs.js";

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

// PATCH /update - Update an existing booking by ID with all fields
blogController.patch("/update", (req, res) => {
    // TODO: Validate incoming date here

    const blog = req.body

    updateBlogByID(
            blog.blog_id,
            blog.blog_title,
            blog.blog_content,
            blog.blog_author,
        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Blog updated"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to update blog",
                error: error,
            })
        })
})

// GET /byid/:id - Get a single booking by ID
blogController.get("/byid/:id", (req, res) => {
    // This if statement checks that an ID was provided in the url:
    // ie. bookings/byid/24 <-- do we have this.
    if (req.params.id) {
        getBlogByID(req.params.id)
            .then(([results]) => {
                // Check that we found a booking
                if (results.length > 0) {
                    const first_blog = results[0]
                    res.status(200).json({
                        status: 200,
                        blogs: first_blog
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Blog not found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Query error",
                    error: error,
                })
            })
    } else {
        res.status(400).json({
            status: 400,
            message: "Missing blog ID from request"
        })
    }
})

// DELETE /delete/:id - Delete an existing booking by ID
blogController.delete("/delete/:id", (req, res) => {
    if (req.params.id) {
        deleteBlogByID(req.params.id)
            .then(([result]) => {
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: "Blog deleted"
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Blog not found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to delete blog",
                    error: error,
                })
            })
    }
})



export default blogController;