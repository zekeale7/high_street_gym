import express from "express";
import bcrypt from "bcryptjs";
import { getAllLogins, getLoginByUsername } from "../models/logins.js";
import { getCustomerByID, getCustomerByLoginID } from "../models/customers.js";
import { getTrainerByID, getTrainerByLoginID } from "../models/trainers.js";
import { getAdminByID, getAdminByLoginID } from "../models/admins.js";

const loginController = express.Router();

loginController.get("/all", (request, response) => {
    getAllLogins()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

loginController.get("/identity", async(req, res) => {
    let body = {
        status: 200,
        logged_in: false,
        customer: null,
        trainer: null,
        admin: null,
    };

    if (req.session.login) {
        // Update logged in status
        body.logged_in = true;

        // Add customer object if it exists
        if (req.session.login.customer_id) {
            let [
                [customer]
            ] = await getCustomerByID(
                req.session.login.customer_id
            );
            body.customer = customer;
        }

        // Add staff object if it exists
        if (req.session.login.trainer_id) {
            let [
                [trainer]
            ] = await getTrainerByID(req.session.login.trainer_id);
            body.trainer = trainer;
        }

        // Add admin object if it exists
        if (req.session.login.admin_id) {
            let [
                [admin]
            ] = await getAdminByID(req.session.login.admin_id);
            body.admin = admin;
        }
    }

    res.status(200).json(body);
});

loginController.post("/login", async(req, res) => {
    const { username: username = null, password: password = null } = req.body;

    const [logins] = await getLoginByUsername(username);

    for (const login of logins) {
        if (username == login.login_username) {
            if (await bcrypt.compare(password, login.login_password)) {
                // OK: Matching credentials

                // Create a new login object in the session
                req.session.login = {};

                // Add login id to session
                req.session.login.login_id = login.login_id;

                // look up customer row
                const [
                    [customer]
                ] = await getCustomerByLoginID(login.login_id);
                if (customer) {
                    req.session.login.customer_id = customer.customer_id;
                }
                // look up staff row
                const [
                    [trainer]
                ] = await getTrainerByLoginID(login.login_id);
                if (trainer) {
                    req.session.login.trainer_id = trainer.trainer_id;
                }
                // look up admin row
                const [
                    [admin]
                ] = await getAdminByLoginID(login.login_id);
                if (admin) {
                    req.session.login.admin_id = admin.admin_id;
                }

                res.status(200).json({
                    status: 200,
                    message: "login successful",
                });

                // Stop function once a login has been found
                return;
            }
        }
    }


    // Only reached if no matches were found
    res.status(404).json({
        status: 404,
        message: "Invalid login details",
    });
});

loginController.get("/byid/:id", (req, res) => {
    // This if statement checks that an ID was provided in the url:
    // ie. bookings/byid/24 <-- do we have this.
    if (req.params.id) {
        getCustomerByLoginID(req.params.id)
            .then(([results]) => {
                // Check that we found a booking
                if (results.length > 0) {
                    const first_trainer = results[0]
                    res.status(200).json({
                        status: 200,
                        customer: first_trainer
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Trainer not found"
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
            message: "Missing Trainer ID from request"
        })
    }
})
loginController.post("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).json({
        status: 200,
        message: "logout successful",
    });
});

export default loginController;