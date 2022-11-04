import express from "express";
import bcrypt from "bcryptjs";
import { createCustomer, deleteCustomerByID, getAllCustomers, getCustomerByID, updateCustomerById } from "../models/customers.js";
import { createLogin, deleteLoginByID } from "../models/logins.js";


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
    // TODO: Validate incoming date here

    const customer = req.body

    updateCustomerById(
            customer.customer_id,
            customer.first_name,
            customer.last_name,
            customer.phone,
            customer.email,
            customer.country,
            customer.state,
            customer.street,
            customer.city,
            customer.street,
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
    // TODO: Validation

    const signUp = req.body;

    // Hash password
    const password_hash = await bcrypt.hash(signUp.password, 6);

    // Create login
    const [result] = await createLogin(signUp.username, password_hash);
    const login_id = result.insertId;

    createCustomer(
            login_id,
            signUp.first_name,
            signUp.last_name,
            signUp.phone,
            signUp.email,
            signUp.country,
            signUp.state,
            signUp.city,
            signUp.street,
            signUp.postcode
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