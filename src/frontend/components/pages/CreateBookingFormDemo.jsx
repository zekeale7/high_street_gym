import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"


export const CreateBookingFormDemo = () => {
    const navigate = useNavigate()

    const [date, setDate] = useState("2022-1-1")
    const [trainerName, setTrainerName] = useState("John Doe")
    const [activityID, setActivityID] = useState(1)

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

    const onSubmitCreateBooking = (e) => {
        e.preventDefault()
        const booking = {
            booking_date: date,
            trainer_name: trainerName,
            activity_id: activityID,
        }

        fetch("/api/bookings_demo/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                // You would probably want to redirect (navigate) to another page here.
                navigate("/")
            })
            .catch(error => {
                alert(error)
            })
    }

    return <form onSubmit={onSubmitCreateBooking}>
        <label>Date:</label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Trainer Name:</label>
        <input type="text" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
        <label>Activity:</label>
        <select value={activityID} onChange={(e) => setActivityID(e.target.value)}>
            {activityList.map(activity =>
                <option value={activity.activity_id}>{activity.activity_name}</option>
            )}
        </select>
        <input type="submit" value="Create Booking" />
    </form>
}