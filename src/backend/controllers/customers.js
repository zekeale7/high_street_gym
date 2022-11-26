import express from "express";
import bcrypt from "bcryptjs";
import { createCustomer, deleteCustomerByID, getAllCustomers, getCustomerByID, updateCustomerById, getCustomerByLoginID } from "../models/customers.js";
import { createLogin } from "../models/logins.js";
import validator from "validator"


const customerController = express.Router();

customerController.get("/all", (request, response) => {
    getAllCustomers()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

// PATCH /update - Update an existing booking by ID with all fields
customerController.patch("/update", (req, res) => {

    const customer = req.body

    if (!validator.isAlphanumeric(customer.first_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid firstname"
        })
        return
    }

    if (!validator.isAlphanumeric(customer.last_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid lastname"
        })
        return
    }
    if (!validator.isAlphanumeric(customer.phone)) {
        res.status(400).json({
            status: 400,
            message: "invalid phone"
        })
        return
    }

    if (!validator.isEmail(customer.email)) {
        res.status(400).json({
            status: 400,
            message: "invalid email"
        })
        return
    }
    if (!validator.isAlphanumeric(customer.country)) {
        res.status(400).json({
            status: 400,
            message: "invalid country"
        })
        return
    }

    if (!validator.isAlphanumeric(customer.state)) {
        res.status(400).json({
            status: 400,
            message: "invalid state"
        })
        return
    }
    if (!validator.isAlphanumeric(customer.street)) {
        res.status(400).json({
            status: 400,
            message: "invalid street"
        })
        return
    }

    if (!validator.isAlphanumeric(customer.city)) {
        res.status(400).json({
            status: 400,
            message: "invalid city"
        })
        return
    }
    if (!validator.isAlphanumeric(customer.postcode)) {
        res.status(400).json({
            status: 400,
            message: "invalid postcode"
        })
        return
    }

    updateCustomerById(
            customer.customer_id,
            validator.escape(customer.first_name),
            validator.escape(customer.last_name),
            validator.escape(customer.phone),
            validator.escape(customer.email),
            validator.escape(customer.country),
            validator.escape(customer.state),
            validator.escape(customer.street),
            validator.escape(customer.city),
            validator.escape(customer.postcode),
        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Customer updated"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to update customer",
                error: error,
            })
        })
})

// GET /byid/:id - Get a single booking by ID
customerController.get("/byid/:id", (req, res) => {
    // This if statement checks that an ID was provided in the url:
    // ie. bookings/byid/24 <-- do we have this.
    if (req.params.id) {
        getCustomerByID(req.params.id)
            .then(([results]) => {
                // Check that we found a booking
                if (results.length > 0) {
                    const first_customer = results[0]
                    res.status(200).json({
                        status: 200,
                        customer: first_customer
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Customer not found"
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
            message: "Missing customer ID from request"
        })
    }
})

customerController.post("/sign-up", async(req, res) => {

    const signUp = req.body;


    if (!validator.isAlphanumeric(signUp.first_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid firstname"
        })
        return
    }

    if (!validator.isAlphanumeric(signUp.last_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid lastname"
        })
        return
    }
    if (!validator.isAlphanumeric(signUp.phone)) {
        res.status(400).json({
            status: 400,
            message: "invalid phone"
        })
        return
    }

    if (!validator.isEmail(signUp.email)) {
        res.status(400).json({
            status: 400,
            message: "invalid email"
        })
        return
    }
    if (!validator.isAlphanumeric(signUp.country)) {
        res.status(400).json({
            status: 400,
            message: "invalid country"
        })
        return
    }

    if (!validator.isAlphanumeric(signUp.state)) {
        res.status(400).json({
            status: 400,
            message: "invalid state"
        })
        return
    }
    if (!validator.isAlphanumeric(signUp.street)) {
        res.status(400).json({
            status: 400,
            message: "invalid street"
        })
        return
    }

    if (!validator.isAlphanumeric(signUp.city)) {
        res.status(400).json({
            status: 400,
            message: "invalid city"
        })
        return
    }
    if (!validator.isAlphanumeric(signUp.postcode)) {
        res.status(400).json({
            status: 400,
            message: "invalid postcode"
        })
        return
    }


    // Hash password
    const password_hash = await bcrypt.hash(signUp.password, 6);

    // Create login
    const [result] = await createLogin(signUp.username, password_hash);
    const login_id = result.insertId;

    createCustomer(
            login_id,
            validator.escape(signUp.first_name),
            validator.escape(signUp.last_name),
            validator.escape(signUp.phone),
            validator.escape(signUp.email),
            validator.escape(signUp.country),
            validator.escape(signUp.state),
            validator.escape(signUp.street),
            validator.escape(signUp.city),
            validator.escape(signUp.postcode),
            password_hash
        )
        .then(() => {
            res.status(200).json({
                status: 200,
                message: "Sign up successful",
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to sign up: " + error,
            });
        });
});

// DELETE /delete/:id - Delete an existing booking by ID
customerController.delete("/delete/:id", (req, res) => {
    if (req.params.id) {
        deleteCustomerByID(req.params.id)
            .then(([result]) => {
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: "Customer deleted"
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Customer not found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to delete Customer",
                    error: error,
                })
            })
    }
})



export default customerController;