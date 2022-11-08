import { db_conn } from "../database.js";

export function getAdminByLoginID(login_id) {
    return db_conn.query("SELECT * FROM admins WHERE login_id = ?", [login_id]);

}

export function getAllAdmins() {
    return db_conn.query("SELECT * FROM admins");
}

export function getAdminByID(admin_id) {
    return db_conn.query("SELECT * FROM admins WHERE admin_id = ?", [admin_id]);
}

export function createAdmin(
    login_id,
    first_name,
    last_name,
) {
    return db_conn.query(
        `
    INSERT INTO admins
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

// Update
export function updateAdminByID(admin_id, first_name, last_name, login_id) {
    return db_conn.query(
        "UPDATE admins " +
        "SET first_name = ?, last_name = ?, login_id = ? " +
        "WHERE admin_id = ?", [first_name, last_name, login_id, admin_id]
    )
}

// Delete
export function deleteAdminByID(admin_id) {
    return db_conn.query("DELETE FROM admins WHERE admin_id = ?", [admin_id])
}