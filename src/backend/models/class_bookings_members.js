import { db_conn } from "../database.js";

// Create
export function createClassBookingMember(class_bookings_members_id, class_booking_id, customer_id) {
    return db_conn.query(
        "INSERT INTO class_bookings_members " +
        "(class_booking_id, customer_id) " +
        "VALUES (?, ?,)", [class_booking_id, customer_id, class_bookings_members_id]
    )
}

// Reads
export function getAllClassBookingMembers() {
    return db_conn.query("SELECT * FROM class_bookings_members")
}

export function getClassBookingMemberByID(class_bookings_members_id) {
    return db_conn.query(
        "SELECT * FROM class_bookings_members WHERE class_bookings_members_id = ?", [class_bookings_members_id]
    )
}

// Update
export function updateClassBookingMemberByID(class_bookings_members_id, class_booking_id, customer_id) {
    return db_conn.query(
        "UPDATE class_bookings_members " +
        "SET class_bookings_members_id = ?, customer_id = ? " +
        "WHERE class_bookings_members_id = ?", [class_booking_id, customer_id, class_bookings_members_id]
    )
}

// Delete
export function deleteClassBookingMemberByID(class_bookings_members_id) {
    return db_conn.query("DELETE FROM class_bookings_members WHERE class_bookings_members_id = ?", [class_bookings_members_id])
}