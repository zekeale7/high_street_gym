import { db_conn } from "../database.js";


// For CRUD we need: insert, read all, read one by ID, update by ID, delete by ID.

export function getAllActivities() {
    return db_conn.query("SELECT * FROM activities_demo")
}

export function getActivityById(activity_id) {
    return db_conn.query("SELECT * FROM activities_demo WHERE activity_id = ?", [activity_id])
}

// TODO: Add others... (out of scope for this lesson).