import express from "express";
import fs from "fs";
import ejs from "ejs";
import { getAllCruises } from "../models/cruises.js";
import { getPortsByID } from "../models/ports_sail.js";
import { getAllBookings, getAllBookingsByCruiseID } from "../models/bookings.js";
import { getAllCustomers, getCustomerByID } from "../models/customers.js";
import { getAllTrainers, getTrainerByID } from "../models/trainers.js";
import { getAllClasses, getClassByID } from "../models/classes.js";
import { getClassBookingMemberByID } from "../models/class_bookings_members.js";
import { getAllClassBookings, getClassByBookingID } from "../models/class_bookings.js";

const exportController = express.Router();

exportController.get("/trainer-list", async(req, res) => {
    // Build list of cruise objects from relational data
    const [trainers] = await getAllTrainers();
    for (const trainer of trainers) {
        trainer["trainers"] = trainer;
    }


    // Generate XML document using template
    const xml = ejs.render(
        fs.readFileSync("./src/backend/xml/trainer_list.xml.ejs").toString(), {
            trainers: trainers,
        }
    );

    // Send XML as download
    res.status(200)
        .header(
            "Content-Disposition",
            'attachment; filename="trainer_list-export.xml"'
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