import { db_conn } from "../database.js";

// Create
export function createClassBookingMember(first_name, last_name, customer_id, class_booking_id) {
    return db_conn.query(
        "INSERT INTO class_bookings_members " +
        "(first_name, last_name, customer_id, class_booking_id) " +
        "VALUES (?, ?, ?, ?)", [first_name, last_name, customer_id, class_booking_id]
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
export function updateClassBookingMemberByID(class_bookings_members_id, first_name, last_name, class_booking_id, customer_id) {
    return db_conn.query(
        "UPDATE class_bookings_members " +
        "SET first_name = ?, last_name = ?, customer_id = ? " +
        "WHERE class_bookings_members_id = ?", [class_booking_id, first_name, last_name, customer_id, class_bookings_members_id]
    )
}

// Delete
export function deleteClassBookingMemberByID(class_bookings_members_id) {
    return db_conn.query("DELETE FROM class_bookings_members WHERE class_bookings_members_id = ?", [class_bookings_members_id])
}

export function getBookingbyCustomer(customer_id) {
    return db_conn.query(
        "SELECT * FROM class_bookings_members WHERE customer_id = ?", [customer_id]
    )
}

export function getBookingMemberDetails() {
    return db_conn.query(`
        SELECT * 
        FROM class_bookings_members
        INNER JOIN class_bookings 
        ON class_bookings_members.class_booking_id = class_bookings.class_booking_id
    `)
}



export function getBookingsFromMemeberBooking(class_booking_id) {
    return db_conn.query("SELECT * FROM class_bookings_members WHERE class_booking_id = ?", [
        class_booking_id,
    ]);
}