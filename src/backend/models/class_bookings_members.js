import { db_conn } from "../database.js";

export function getAllClassBookingMembers() {
    return db_conn.query("SELECT * FROM class_bookings_members");
}

export function createClassBookingMember(class_booking_id, customer_id) {
    return db_conn.query(
        "INSERT INTO class_bookings_members (class_booking_id, customer_id)" +
        "VALUES (?, ?)", [class_booking_id, customer_id, ]
    )
}