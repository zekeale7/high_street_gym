import express from "express"
import {
    createClassBooking,
    getAllClassBookings,
    deleteClassBookingById,
    updateClassBookingById,
    getClassBookingById
} from "../models/class_bookings.js"

const classBookingController = express.Router()

// GET /all - Get a list of all bookings
classBookingController.get("/all", (req, res) => {
    getAllClassBookings()
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
classBookingController.get("/byid/:id", (req, res) => {
    // This if statement checks that an ID was provided in the url:
    // ie. bookings/byid/24 <-- do we have this.
    if (req.params.id) {
        getClassBookingById(req.params.id)
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
classBookingController.post("/create", (req, res) => {
    // TODO: Validate incoming date here

    const booking = req.body

    createClassBooking(
            booking.booking_date,
            booking.class_trainer_name,
            booking.class_id
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
classBookingController.patch("/update", (req, res) => {
    // TODO: Validate incoming date here

    const booking = req.body

    updateClassBookingById(
            booking.class_booking_id,
            booking.booking_date,
            booking.class_trainer_name,
            booking.class_id
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
classBookingController.delete("/delete/:id", (req, res) => {
    if (req.params.id) {
        deleteClassBookingById(req.params.id)
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


export default classBookingController;