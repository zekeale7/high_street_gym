import express from "express";
import bcrypt from "bcryptjs";
import { createClassBooking, getAllClassBookings, getClassBookingByID, getClassBookingDetails } from "../models/class_bookings.js";



const classBookingController = express.Router();

classBookingController.get("/all", (req, res) => {
    getAllClassBookings()
        .then(([class_bookings]) => {
            res.status(200).json({
                status: 200,
                class_bookings: class_bookings,
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to get blog list from database",
            });
        });
});

classBookingController.get("/booking_details", (req, res) => {
    getClassBookingDetails()
        .then(([class_bookings]) => {
            res.status(200).json({
                status: 200,
                class_bookings: class_bookings,
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to get blog list from database",
            });
        });
});


classBookingController.get("/:id", (request, response) => {
    getClassBookingByID(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("Class Booking not found")
            }
        })
        .catch(error => {
            console.log("failed to get class booking by id - " + error)
            response.status(500).json("failed to get class booking by id")
        })
})

classBookingController.post("/create", async(req, res) => {
    // TODO: Validation

    const signUp = req.body;

    createClassBooking(
            signUp.booking_date,
        )
        .then(() => {
            res.status(200).json({
                status: 200,
                message: " Class Booking Created",
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to create class booking: " + error,
            });
        });
});

export default classBookingController;