import { db_conn } from "../database.js";

export function getAllBlogs() {
    return db_conn.query("SELECT * FROM blogs");
}