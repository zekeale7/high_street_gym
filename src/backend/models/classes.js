import { db_conn } from "../database.js";


// For CRUD we need: insert, read all, read one by ID, update by ID, delete by ID.

export function getAllClasses() {
    return db_conn.query("SELECT * FROM classes")
}

export function getClassById(class_id) {
    return db_conn.query("SELECT * FROM classes WHERE class_id = ?", [class_id])
}

// TODO: Add others... (out of scope for this lesson).