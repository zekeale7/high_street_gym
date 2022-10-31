import express from "express";
import { createClassBookingMember } from "../models/class_bookings_members.js";

const classBookingMembersController = express.Router();

classBookingMembersController.post("/create", (request, response) => {
    let create = request.body

    createClassBookingMember(create.class_booking_id, create.customer_id)
        .then(([results]) => {
            response.status(200).json({ status: "Class booked successfully", class_bookings_members_id: results.insertId })
        })
        .catch(error => {
            response.status(500).json("failed to book class")
            console.log(error)
        })
})

export default classBookingMembersController;