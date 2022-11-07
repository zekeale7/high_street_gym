import express from "express"
import { getClassById, getAllClasses } from "../models/classes.js"

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
        getClassById(req.params.id)
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

export default classController;