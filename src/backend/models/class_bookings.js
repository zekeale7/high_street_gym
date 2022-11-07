import { db_conn } from "../database.js";



// Create
export function createClassBooking(booking_date, class_trainer_name, class_id) {
    return db_conn.query(
        "INSERT INTO class_bookings " +
        "(booking_date, class_trainer_name, class_id) " +
        "VALUES (?, ?, ?)", [booking_date, class_trainer_name, class_id]
    )
}

// Reads
export function getAllClassBookings() {
    return db_conn.query("SELECT * FROM class_bookings")
}

export function getClassBookingById(class_booking_id) {
    return db_conn.query(
        "SELECT * FROM class_bookings WHERE class_booking_id = ?", [class_booking_id]
    )
}

// Update
export function updateClassBookingById(class_booking_id, booking_date, class_trainer_name, class_id) {
    return db_conn.query(
        "UPDATE class_bookings " +
        "SET booking_date = ?, class_trainer_name = ?, class_id = ? " +
        "WHERE class_booking_id = ?", [booking_date, class_trainer_name, class_id, class_booking_id]
    )
}

// Delete
export function deleteClassBookingById(class_booking_id) {
    return db_conn.query("DELETE FROM class_bookings WHERE class_booking_id = ?", [class_booking_id])
}