import express from "express";
import bcrypt from "bcryptjs";
import { createCustomer, deleteCustomerByID, getAllCustomers, getCustomerByID, updateCustomerByID } from "../models/customers.js";
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

customerController.post("/update", (request, response) => {
    let customer = request.body

    updateCustomerByID(
            customer.customer_id,
            customer.first_name,
            customer.last_name,
            customer.phone,
            customer.email,
            customer.country,
            customer.state,
            customer.city,
            customer.street,
            customer.postcode
        )
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Customer updated")
            } else {
                response.status(404).json("Customer not found")
            }
        })
        .catch(error => {
            console.log("Failed to update customer - " + error)
            response.status(500).json("failed to update customer")
        })
})

customerController.get("/:id", (request, response) => {
    getCustomerByID(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("Customer not found")
            }
        })
        .catch(error => {
            console.log("failed to get customer by id - " + error)
            response.status(500).json("failed to get customer by id")
        })
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

customerController.delete("/delete/:id/", (request, response) => {
    let customer_id = request.params.customer_id

    deleteCustomerByID(customer_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("customer deleted")
            } else {
                response.status(404).json("customer not found")
            }
        })
        .catch(error => {
            console.log("Failed to delete user - " + error)
            response.status(500).json("failed to delete user")
        })
})

export default customerController;