import express from "express"
import { getActivityById, getAllActivities } from "../models/activities_demo.js"

const activityController = express.Router()

// GET /all - Returns an object with status code and array of activities
activityController.get("/all", (req, res) => {
    getAllActivities()
        .then(([results]) => {
            res.status(200).json({
                status: 200,
                activities: results
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                message: "Failed to query activities",
                error: error,
            })
        })
})

// GET /by_id/:id - Returns a status and a single activity object
activityController.get("/byid/:id", (req, res) => {
    if (req.params.id) {
        getActivityById(req.params.id)
            .then(([results]) => {
                // Check that we found an activity
                if (results.length > 0) {
                    const first_activity = results[0]
                    res.status(200).json({
                        status: 200,
                        activity: first_activity
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Activity not found"
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

export default activityController;