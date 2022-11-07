import express from "express"
import { getAllClasses, deleteClassByID, updateClassByID, getClassByID } from "../models/classes.js"


const classController = express.Router()

// GET /all - Returns an object with status code and array of activities
classController.get("/all", (request, response) => {
    getAllClasses()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})


// GET /by_id/:id - Returns a status and a single activity object
classController.get("/byid/:id", (req, res) => {
    if (req.params.id) {
        getClassByID(req.params.id)
            .then(([results]) => {
                // Check that we found an activity
                if (results.length > 0) {
                    const first_class = results[0]
                    res.status(200).json({
                        status: 200,
                        classes: first_class
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Class not found"
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
            message: "Missing activity ID from request"
        })
    }
})

// PATCH /update - Update an existing booking by ID with all fields
classController.patch("/update", (req, res) => {
    // TODO: Validate incoming date here

    const classes = req.body

    updateClassByID(
            classes.class_id,
            classes.class_name,
            classes.duration_minutes,
            classes.level,
            classes.trainer_id

        )
        .then(([result]) => {
            res.status(200).json({
                status: 200,
                message: "Class updated"
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to update class",
                error: error,
            })
        })
})

// DELETE /delete/:id - Delete an existing booking by ID
classController.delete("/delete/:id", (req, res) => {
    if (req.params.id) {
        deleteClassByID(req.params.id)
            .then(([result]) => {
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: "Class deleted"
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Class not found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to delete Class",
                    error: error,
                })
            })
    }
})

export default classController;