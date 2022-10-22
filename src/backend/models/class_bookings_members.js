import { db_conn } from "../database.js";

export function getAllClassBookingMembers() {
    return db_conn.query("SELECT * FROM class_bookings_members");
}