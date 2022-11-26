import express from "express";
import bcrypt from "bcryptjs";
import { createTrainer, deleteTrainerById, getAllTrainers, getTrainerByID, updateTrainerById } from "../models/trainers.js";
import { createLogin } from "../models/logins.js";
import validator from "validator"

const trainerController = express.Router();

trainerController.get("/all", (req, res) => {
    getAllTrainers()
        .then(([results]) => {
            res.status(200).json({
                status: 200,
                trainer: results,
            })
        })
        .catch(error => {
            res.status(500).json({
                status: 500,
                message: "Failed to query trainers",
                error: error,
            })
        })
})

trainerController.post("/sign-up", async(req, res) => {

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

    createTrainer(
            login_id,
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

// PATCH /update - Update an existing booking by ID with all fields
trainerController.patch("/update", (req, res) => {

    const trainer = req.body

    if (!validator.isAlphanumeric(trainer.first_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid firstname"
        })
        return
    }

    if (!validator.isAlphanumeric(trainer.last_name)) {
        res.status(400).json({
            status: 400,
            message: "invalid lastname"
        })
        return
    }

    updateTrainerById(
            trainer.trainer_id,
            validator.escape(trainer.first_name),
            validator.escape(trainer.last_name),
            trainer.login_id
        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Trainer updated"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to update trainer",
                error: error,
            })
        })
})

// GET /byid/:id - Get a single booking by ID
trainerController.get("/byid/:id", (req, res) => {
    // This if statement checks that an ID was provided in the url:
    // ie. bookings/byid/24 <-- do we have this.
    if (req.params.id) {
        getTrainerByID(req.params.id)
            .then(([results]) => {
                // Check that we found a booking
                if (results.length > 0) {
                    const first_trainer = results[0]
                    res.status(200).json({
                        status: 200,
                        trainer: first_trainer
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

// DELETE /delete/:id - Delete an existing booking by ID
trainerController.delete("/delete/:id", (req, res) => {
    if (req.params.id) {
        deleteTrainerById(req.params.id)
            .then(([result]) => {
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: "Trainer deleted"
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
                    message: "Failed to delete Trainer",
                    error: error,
                })
            })
    }
})


export default trainerController;