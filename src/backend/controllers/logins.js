import express from "express";
import bcrypt from "bcryptjs";
import { getAllLogins, getLoginByUsername } from "../models/logins.js";
import { getCustomerByID, getCustomerByLoginID } from "../models/customers.js";
import { getTrainerByID, getTrainerByLoginID } from "../models/trainers.js";

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

loginController.post("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).json({
        status: 200,
        message: "logout successful",
    });
});

export default loginController;