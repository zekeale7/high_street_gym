import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"

export const BlogsDemo = () => {
    // Request the list of all bookings and store in state
    const [bookings, setBookings] = useState([])

    // useEffect will run once by default, we use this to do an initial
    // fetch to the backend for the list of bookings.
    useEffect(() => {
        fetch("/api/bookings_demo/all")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setBookings(res.bookings)
                } else if (res.status == 500) {
                    alert("A backend error occurred")
                } else {
                    alert("An unknown error occurred")
                }
            })
            .catch((error) => {
                alert("Request error!")
                console.log(error)
            })
    }, [])

    // Render the component and map each booking to a item component
    return <section>
        {bookings.map(booking => <BookingItem booking={booking} />)}
    </section>
}

const BookingItem = ({ booking }) => {
    // Store the activity details for this booking item in the list
    const [activity, setActivity] = useState({
        activity_name: "Unknown",
        activity_level: "Unknown"
    })

    // Load the activity details for this booking item
    useEffect(() => {
        fetch("/api/activities_demo/byid/" + booking.trainer_booking_activity_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setActivity(res.activity)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])

    return <article>
        <h3>Booking - {booking.trainer_booking_trainer_name}</h3>
        <span>Date: {booking.trainer_booking_date}</span>
        <br />
        <span>Activity: {activity.activity_level} {activity.activity_name}</span>
        <br />
        <Link to={"/EditBookingFormDemo/" + booking.trainer_booking_id}>Edit</Link>
        <Link to={"/DeleteBookingDemo/" + booking.trainer_booking_id}>Delete</Link>
    </article>
}