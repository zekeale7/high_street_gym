import express from "express";
import bcrypt from "bcryptjs";
import { createLogin } from "../models/logins.js";
import { createAdmin, deleteAdminByID, getAdminByID, getAllAdmins, updateAdminByID } from "../models/admins.js";
import validator from "validator"


const adminController = express.Router();

adminController.get("/all", (request, response) => {
    getAllAdmins()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

adminController.post("/sign-up", async(req, res) => {

    const signUp = req.body;

    if (!validator.isAlphanumeric(signUp.first_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid Firstname"
        })
        return
    }
    if (!validator.isAlphanumeric(signUp.last_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid Lastname"
        })
        return
    }
    if (!validator.isAlphanumeric(signUp.username)) {
        res.status(400).json({
            status: 400,
            message: "invalid Username"
        })
        return
    }

    // Hash password
    const password_hash = await bcrypt.hash(signUp.password, 6);

    // Create login
    const [result] = await createLogin(signUp.username, password_hash);
    const login_id = result.insertId;

    createAdmin(
            login_id,
            validator.escape(signUp.username),
            validator.escape(signUp.first_name),
            validator.escape(signUp.last_name),
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

// GET /byid/:id - Get a single booking by ID
adminController.get("/byid/:id", (req, res) => {
    // This if statement checks that an ID was provided in the url:
    // ie. bookings/byid/24 <-- do we have this.
    if (req.params.id) {
        getAdminByID(req.params.id)
            .then(([results]) => {
                // Check that we found a booking
                if (results.length > 0) {
                    const first_admin = results[0]
                    res.status(200).json({
                        status: 200,
                        admin: first_admin
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Admin not found"
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
            message: "Missing Admin ID from request"
        })
    }
})

// PATCH /update - Update an existing booking by ID with all fields
adminController.patch("/update", (req, res) => {

    const admin = req.body

    if (!validator.isAlphanumeric(admin.first_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid firstname"
        })
        return
    }

    if (!validator.isAlphanumeric(admin.last_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid lastname"
        })
        return
    }


    updateAdminByID(
            admin.admin_id,
            validator.escape(admin.first_name),
            validator.escape(admin.last_name),
            admin.login_id
        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Admin updated"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to update admin",
                error: error,
            })
        })
})

// DELETE /delete/:id - Delete an existing booking by ID
adminController.delete("/delete/:id", (req, res) => {
    if (req.params.id) {
        deleteAdminByID(req.params.id)
            .then(([result]) => {
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: "Admin deleted"
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Admin not found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to delete Admin",
                    error: error,
                })
            })
    }
})



export default adminController;