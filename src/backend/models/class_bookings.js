import { db_conn } from "../database.js";



// Create
export function createClassBooking(booking_date, trainer_id, class_id) {
    return db_conn.query(
        "INSERT INTO class_bookings " +
        "(booking_date, trainer_id, class_id) " +
        "VALUES (?, ?, ?)", [booking_date, trainer_id, class_id]
    )
}

// Reads
export function getAllClassBookings() {
    return db_conn.query("SELECT * FROM class_bookings")
}


// Update
export function updateClassBookingById(class_booking_id, booking_date, trainer_id, class_id) {
    return db_conn.query(
        "UPDATE class_bookings " +
        "SET booking_date = ?, trainer_id = ?, class_id = ? " +
        "WHERE class_booking_id = ?", [booking_date, trainer_id, class_id, class_booking_id]
    )
}

// Delete
export function deleteClassBookingById(class_booking_id) {
    return db_conn.query("DELETE FROM class_bookings WHERE class_booking_id = ?", [class_booking_id])
}

export function getClassByBookingID(class_id) {
    return db_conn.query("SELECT * FROM class_bookings WHERE class_id = ?", [
        class_id,
    ]);
}

export function getBookingByCustomerID(customer_id) {
    return db_conn.query("SELECT * FROM class_bookings WHERE customer_id = ?", [
        customer_id,
    ]);
}

export function getBookingByID(class_booking_id) {
    return db_conn.query("SELECT * FROM class_bookings WHERE class_booking_id = ?", [class_booking_id])
}

export function getBookingDetails() {
    return db_conn.query(`
        SELECT * 
        FROM class_bookings
        INNER JOIN classes 
        ON class_bookings.class_id = classes.class_id
        INNER JOIN trainers 
        ON class_bookings.trainer_id = trainers.trainer_id
    `)

}