import { db_conn } from "../database.js";

export function getAllClasses() {
    return db_conn.query("SELECT * FROM classes");
}

export function getClassByID(class_id) {
    return db_conn.query("SELECT * FROM classes WHERE class_id = ?", [class_id]);
}

export function createClass(
    class_name,
    duration_minutes,
    level,
    trainer_id
) {
    return db_conn.query(
        `
    INSERT INTO classes
    (
        class_name, duration_minutes, level, trainer_id
    )
    VALUES (?, ?, ?, ?)
    `, [
            class_name,
            duration_minutes,
            level,
            trainer_id
        ]
    );
}