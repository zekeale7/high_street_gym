import express from "express";
import bcrypt from "bcryptjs";
import { createTrainer, getAllTrainers, getTrainerByID } from "../models/trainers.js";
import { createLogin } from "../models/logins.js";


const trainerController = express.Router();

trainerController.get("/all", (request, response) => {
    getAllTrainers()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

trainerController.get("/:id", (request, response) => {
    getTrainerByID(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("Trainer not found")
            }
        })
        .catch(error => {
            console.log("failed to get trainer by id - " + error)
            response.status(500).json("failed to get trainer by id")
        })
})

trainerController.post("/sign-up", async(req, res) => {
    // TODO: Validation

    const signUp = req.body;

    // Hash password
    const password_hash = await bcrypt.hash(signUp.password, 6);

    // Create login
    const [result] = await createLogin(signUp.username, password_hash);
    const login_id = result.insertId;

    createTrainer(
            login_id,
            signUp.first_name,
            signUp.last_name,
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

export default trainerController;