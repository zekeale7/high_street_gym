import { db_conn } from "../database.js";

export function getAllClassBookings() {
    return db_conn.query("SELECT * FROM class_bookings");
}

export function getClassBookingByID(class_booking_id) {
    return db_conn.query("SELECT * FROM class_bookings WHERE class_booking_id = ?", [class_booking_id]);
}

export function createClassBooking(
    booking_date,
) {
    return db_conn.query(
        `
    INSERT INTO class_bookings
    (
        booking_date, 
    )
    VALUES (?)
    `, [
            booking_date,

        ]
    );
}

export function getClassBookingDetails() {
    return db_conn.query(`
        SELECT * 
        FROM class_bookings
        INNER JOIN trainers 
        ON class_bookings.trainer_id = trainers.trainer_id
        INNER JOIN classes 
        ON class_bookings.class_id = classes.class_id
    `)

}