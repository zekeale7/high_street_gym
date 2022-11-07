import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"



export const EditBookingFormDemo = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Form input state
    const [date, setDate] = useState("2022-1-1")
    const [trainerName, setTrainerName] = useState("John Doe")
    const [activityID, setActivityID] = useState(0)

    // Activity list items
    const [activityList, setActivityList] = useState([])
    useEffect(() => {
        fetch("/api/activities_demo/all")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setActivityList(res.activities)
                } else {
                    console.log("Error loading activities for select box")
                }
            })
    }, [])

    // Load the existing booking data for this record
    useEffect(() => {
        fetch("/api/bookings_demo/byid/" + id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    const booking = res.booking
                    setDate((new Date(booking.trainer_booking_date).toISOString().substring(0, 10)))
                    setTrainerName(booking.trainer_booking_trainer_name)
                    setActivityID(booking.trainer_booking_activity_id)
                } else {
                    console.log("Request error")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [activityList])

    // Handle the saving of updated data
    const onSubmitUpdateBooking = (e) => {
        e.preventDefault()

        const booking = {
            booking_id: id,
            booking_date: date,
            trainer_name: trainerName,
            activity_id: activityID,
        }

        fetch("/api/bookings_demo/update", {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                navigate("/")
                // You would probably want to redirect (navigate) to another page here.
            })
            .catch(error => {
                alert(error)
            })
    }

    return <form onSubmit={onSubmitUpdateBooking}>
        <label>Date:</label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Trainer Name:</label>
        <input type="text" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
        <label>Activity:</label>
        <select onChange={(e) => setActivityID(e.target.value)}>
            {activityList.map(activity =>
                <option selected={activity.activity_id == activityID} value={activity.activity_id}>{activity.activity_name}</option>
            )}
        </select>
        <input type="submit" value="Edit Booking" />
    </form>
}

