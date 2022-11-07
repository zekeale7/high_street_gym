import { db_conn } from "../database.js";



// Create
export function createBooking(booking_date, trainer_name, activity_id) {
    return db_conn.query(
        "INSERT INTO trainer_bookings_demo " +
        "(trainer_booking_date, trainer_booking_trainer_name, trainer_booking_activity_id) " +
        "VALUES (?, ?, ?)", [booking_date, trainer_name, activity_id]
    )
}

// Reads
export function getAllBookings() {
    return db_conn.query("SELECT * FROM trainer_bookings_demo")
}

export function getBookingById(trainer_booking_id) {
    return db_conn.query(
        "SELECT * FROM trainer_bookings_demo WHERE trainer_booking_id = ?", [trainer_booking_id]
    )
}

// Update
export function updateBookingById(booking_id, booking_date, trainer_name, activity_id) {
    return db_conn.query(
        "UPDATE trainer_bookings_demo " +
        "SET trainer_booking_date = ?, trainer_booking_trainer_name = ?, trainer_booking_activity_id = ? " +
        "WHERE trainer_booking_id = ?", [booking_date, trainer_name, activity_id, booking_id]
    )
}

// Delete
export function deleteBookingById(booking_id) {
    return db_conn.query("DELETE FROM trainer_bookings_demo WHERE trainer_booking_id = ?", [booking_id])
}