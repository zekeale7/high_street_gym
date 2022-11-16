import express from "express"
import { createClassBookingMember, deleteClassBookingMemberByID, getAllClassBookingMembers, getBookingDetails, getClassBookingMemberByID, updateClassBookingMemberByID } from "../models/class_bookings_members.js"

const classBookingMemberController = express.Router()

// GET /all - Get a list of all bookings
classBookingMemberController.get("/all", (req, res) => {
    getAllClassBookingMembers()
        .then(([results]) => {
            res.status(200).json({
                status: 200,
                bookings: results
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to query Member bookings",
                error: error,
            })
        })
})

// GET /byid/:id - Get a single booking by ID
classBookingMemberController.get("/byid/:id", (req, res) => {
    // This if statement checks that an ID was provided in the url:
    // ie. bookings/byid/24 <-- do we have this.
    if (req.params.id) {
        getClassBookingMemberByID(req.params.id)
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
                        message: "Member Booking not found"
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
            message: "Missing Member booking ID from request"
        })
    }
})

// POST /create - Create a new booking
classBookingMemberController.post("/create", (req, res) => {
    // TODO: Validate incoming date here

    const booking = req.body

    createClassBookingMember(

            booking.first_name,
            booking.last_name,
            booking.customer_id,
            booking.class_booking_id,

        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Member Booking created"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to create Member booking",
                error: error,
            })
        })
})

// PATCH /update - Update an existing booking by ID with all fields
classBookingMemberController.patch("/update", (req, res) => {
    // TODO: Validate incoming date here

    const booking = req.body

    updateClassBookingMemberByID(
            booking.class_bookings_members_id,
            booking.class_booking_id,
            booking.customer_id,
            booking.first_name,
            booking.last_name,
        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Member Booking updated"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to update Member booking",
                error: error,
            })
        })
})


// DELETE /delete/:id - Delete an existing booking by ID
classBookingMemberController.delete("/delete/:id", (req, res) => {
    if (req.params.id) {
        deleteClassBookingMemberByID(req.params.id)
            .then(([result]) => {
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: "Member Booking deleted"
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Member Booking not found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to delete Member booking",
                    error: error,
                })
            })
    }
})

classBookingMemberController.get("/booking_details/:id", (req, res) => {
    getBookingDetails(req.params.id)
        .then(([results]) => {
            res.status(200).json({
                status: 200,
                booking_details: results,
            })
        })
        .catch(error => {
            res.status(500).json("Failed to get all orders with details")
            console.log(error)
        })
})


export default classBookingMemberController;