import express from "express";
import session from "express-session";

// Create express app and define lisiting port for later
const app = express()
const port = 8080;

// Enable session middleware. (This allows us to use req.session inside endpoints)
app.use(
    session({
        secret: "secret phrase",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
)

// Enable ejs view engine (used to render XML documents)
app.set("view engine", "ejs");
app.set("view", "/src/backend/xml");

// Enable support for JSON and URL-encoded  request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: Hook up controllers



// Test end point
app.get("/hello", (request, response) => {
    response.json("Hello World!");
});

// Mock end point for testing
app.get("/list_cruises", (request, response) => {
    response.status(200).json([{
            ship_name: "RMS Titianic",
            from: "Southampton, Hampshire, South East England",
            to: "New York City",
            departure_date: "15/04/1912",
            passenger_capacity: 2435,
        },
        {
            ship_name: "RMS Luistanan",
            from: "Liverpool",
            to: "New York, France",
            departure_date: "1/05/1915",
            passenger_capacity: 2343,


        },
        {
            ship_name: "RMS Luistanan",
            from: "Liverpool",
            to: "New York, France",
            departure_date: "1/05/1915",
            passenger_capacity: 2343,


        },
        {
            ship_name: "RMS Luistanan",
            from: "Liverpool",
            to: "New York, France",
            departure_date: "1/05/1915",
            passenger_capacity: 2343,


        },
    ]);
});

// Enable support for JSON and URL-encoded request bodies.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static resources
app.use(express.static("static"));

// Hook up controllers
import loginController from "./controllers/logins.js";
app.use("/logins", loginController);
import exportController from "./controllers/export.js";
app.use("/export", exportController);
import cruiseController from "./controllers/cruises.js";
app.use("/cruises", cruiseController);
import adminController from "./controllers/admins.js";
app.use("/admins", adminController);
import customerController from "./controllers/customers.js";
app.use("/customers", customerController);
import trainerController from "./controllers/trainers.js";
app.use("/trainers", trainerController);
import blogController from "./controllers/blogs.js";
app.use("/blogs", blogController);
import classController from "./controllers/classes.js";
app.use("/classes", classController);
import classBookingController from "./controllers/class_bookings.js";
app.use("/class_bookings", classBookingController);
import classBookingMembersController from "./controllers/class_bookings_members.js";
app.use("/class_bookings_members", classBookingMembersController);


// Start listing for requests
app.listen(port, () => {
    console.log(`Express server started on http://localhost:${port}`);
})