import express from "express"
import {
    createBooking,
    getAllBookings,
    deleteBookingById,
    updateBookingById,
    getBookingById
} from "../models/bookings_demo.js"

const bookingController = express.Router()

// GET /all - Get a list of all bookings
bookingController.get("/all", (req, res) => {
    getAllBookings()
        .then(([results]) => {
            res.status(200).json({
                status: 200,
                bookings: results
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to query bookings",
                error: error,
            })
        })
})

// GET /byid/:id - Get a single booking by ID
bookingController.get("/byid/:id", (req, res) => {
    // This if statement checks that an ID was provided in the url:
    // ie. bookings/byid/24 <-- do we have this.
    if (req.params.id) {
        getBookingById(req.params.id)
            .then(([results]) => {
                // Check that we found a booking
                if (results.length > 0) {
                    const first_booking = results[0]
                    res.status(200).json({
                        status: 200,
                        booking: first_booking
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Booking not found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Query error",
                    error: error,
                })
            })
    } else {
        res.status(400).json({
            status: 400,
            message: "Missing booking ID from request"
        })
    }
})

// POST /create - Create a new booking
bookingController.post("/create", (req, res) => {
    // TODO: Validate incoming date here

    const booking = req.body

    createBooking(
            booking.booking_date,
            booking.trainer_name,
            booking.activity_id
        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Booking created"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to create booking",
                error: error,
            })
        })
})

// PATCH /update - Update an existing booking by ID with all fields
bookingController.patch("/update", (req, res) => {
    // TODO: Validate incoming date here

    const booking = req.body

    updateBookingById(
            booking.booking_id,
            booking.booking_date,
            booking.trainer_name,
            booking.activity_id
        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Booking updated"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to update booking",
                error: error,
            })
        })
})


// DELETE /delete/:id - Delete an existing booking by ID
bookingController.delete("/delete/:id", (req, res) => {
    if (req.params.id) {
        deleteBookingById(req.params.id)
            .then(([result]) => {
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: "Booking deleted"
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Booking not found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to delete booking",
                    error: error,
                })
            })
    }
})


export default bookingController;