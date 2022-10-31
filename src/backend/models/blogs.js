import { db_conn } from "../database.js";

export function getAllBlogs() {
    return db_conn.query("SELECT * FROM blogs");
}

export function createBlog(
    blog_title,
    blog_content,
    blog_author,
    login_id
) {
    return db_conn.query(
        `
    INSERT INTO blogs
    (
        blog_title, blog_content, blog_author, login_id
    )
    VALUES (?, ?, ?, ?)
    `, [
            blog_title,
            blog_content,
            blog_author,
            login_id
        ]
    );
}