import { db_conn } from "../database.js";

export function getAllTrainers() {
    return db_conn.query("SELECT * FROM trainers");
}

export function getTrainerByID(trainer_id) {
    return db_conn.query("SELECT * FROM trainers WHERE trainer_id = ?", [trainer_id]);
}

export function getTrainerByLoginID(login_id) {
    return db_conn.query("SELECT * FROM trainers WHERE login_id = ?", [login_id]);

}

export function createTrainer(
    login_id,
    first_name,
    last_name,
) {
    return db_conn.query(
        `
    INSERT INTO trainers
    (
        login_id, first_name, last_name
    )
    VALUES (?, ?, ?)
    `, [
            login_id,
            first_name,
            last_name,
        ]
    );
}