import express from "express";
import bcrypt from "bcryptjs";
import { createClass, getAllClasses, getClassByID } from "../models/classes.js";



const classController = express.Router();

classController.get("/all", (request, response) => {
    getAllClasses()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

classController.get("/:id", (request, response) => {
    getClassByID(request.params.id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("Class not found")
            }
        })
        .catch(error => {
            console.log("failed to get class by id - " + error)
            response.status(500).json("failed to get class by id")
        })
})

classController.post("/create", async(req, res) => {
    // TODO: Validation

    const signUp = req.body;

    createClass(
            signUp.class_name,
            signUp.duration_minutes,
            signUp.level,
        )
        .then(() => {
            res.status(200).json({
                status: 200,
                message: " Class Created",
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to create class: " + error,
            });
        });
});

export default classController;