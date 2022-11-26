import { db_conn } from "../database.js";

export function getAllBlogs() {
    return db_conn.query("SELECT * FROM blogs");
}

export function createBlog(
    blog_title,
    blog_content,
    login_id
) {
    return db_conn.query(
        `
    INSERT INTO blogs
    (
        blog_title, blog_content, login_id
    )
    VALUES (?, ?, ?)
    `, [
            blog_title,
            blog_content,
            login_id
        ]
    );
}

export function deleteBlogByID(blog_id) {
    return db_conn.query("DELETE FROM blogs WHERE blog_id = ?", [blog_id])
}

export function getBlogByID(blog_id) {
    return db_conn.query(
        "SELECT * FROM blogs WHERE blog_id = ?", [blog_id]
    )
}

// Update
export function updateBlogByID(blog_id, blog_title, blog_content) {
    return db_conn.query(
        "UPDATE blogs " +
        "SET blog_title = ?, blog_content = ? " +
        "WHERE blog_id = ?", [blog_title, blog_content, blog_id]
    )
}

export function getBlogByLoginID(login_id) {
    return db_conn.query("SELECT * FROM blogs WHERE login_id = ?", [
        login_id,
    ]);
}