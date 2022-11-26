import express from "express";
import fs from "fs";
import ejs from "ejs";
import { getAllCustomers, getCustomerByID } from "../models/customers.js";
import { getAllTrainers, getTrainerByID } from "../models/trainers.js";
import { getClassByID } from "../models/classes.js";
import { getBookingsFromMemeberBooking } from "../models/class_bookings_members.js";
import { getAllClassBookings } from "../models/class_bookings.js";

const exportController = express.Router();

exportController.get("/member-list", async(req, res) => {
    // Build list of cruise objects from relational data
    const [members] = await getAllCustomers();
    for (const member of members) {
        member["customers"] = member;
    }


    // Generate XML document using template
    const xml = ejs.render(
        fs.readFileSync("./src/backend/xml/member_list.xml.ejs").toString(), {
            members: members,
        }
    );

    // Send XML as download
    res.status(200)
        .header(
            "Content-Disposition",
            'attachment; filename="member_list-export.xml"'
        )
        .header("Content-Type", "application/xml")
        .send(xml);
});

exportController.get("/class-booking-list", async(req, res) => {
    // Build list of bookings objects from relational data
    const [bookings] = await getAllClassBookings();
    for (const booking of bookings) {
        const [
            [trainer]
        ] = await getTrainerByID(booking.trainer_id);

        const [
            [classBooking]
        ] = await getClassByID(booking.class_id);

        booking["trainers"] = trainer;
        booking["classes"] = classBooking;
    }

    // Generate XML document using template
    const xml = ejs.render(
        fs.readFileSync("./src/backend/xml/class_booking_list.xml.ejs").toString(), {
            bookings: bookings,
        }
    );

    // Send XML as download
    res.status(200)
        .header(
            "Content-Disposition",
            'attachment; filename="class_booking_list-export.xml"'
        )
        .header("Content-Type", "application/xml")
        .send(xml);
});


export default exportController;