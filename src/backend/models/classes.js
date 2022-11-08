import { db_conn } from "../database.js";


// For CRUD we need: insert, read all, read one by ID, update by ID, delete by ID.


// Create
export function createClass(class_name, duration_minutes, level, trainer_id) {
    return db_conn.query(
        "INSERT INTO classes " +
        "(class_name, duration_minutes, level, trainer_id) " +
        "VALUES (?, ?, ?, ?)", [class_name, duration_minutes, level, trainer_id]
    )
}

export function getAllClasses() {
    return db_conn.query("SELECT * FROM classes")
}

export function getClassByID(class_id) {
    return db_conn.query("SELECT * FROM classes WHERE class_id = ?", [class_id])
}

// Update
export function updateClassByID(class_id, class_name, duration_minutes, level, trainer_id) {
    return db_conn.query(
        "UPDATE classes " +
        "SET class_name = ?, duration_minutes = ?, level = ?, trainer_id = ? " +
        "WHERE class_id = ?", [class_name, duration_minutes, level, trainer_id, class_id]
    )
}

// Delete
export function deleteClassByID(class_id) {
    return db_conn.query("DELETE FROM classes WHERE class_id = ?", [class_id])
}