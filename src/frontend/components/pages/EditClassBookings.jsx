import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"



export const EditClassBookings = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Form input state
    const [date, setDate] = useState("2022-1-1")
    const [classTrainerName, setClassTrainerName] = useState("John Doe")
    const [classID, setClassID] = useState(1)

    // Activity list items
    const [classList, setClassList] = useState([])
    useEffect(() => {
        fetch("/api/classes/all")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClassList(res.classes)
                } else {
                    console.log("Error loading activities for select box")
                }
            })
    }, [])

    // Load the existing booking data for this record
    useEffect(() => {
        fetch("/api/class_bookings/byid/" + id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    const booking = res.booking
                    setDate((new Date(booking.booking_date).toISOString().substring(0, 10)))
                    setClassTrainerName(booking.class_trainer_name)
                    setClassID(booking.class_id)
                } else {
                    console.log("Request error")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [classList])

    // Handle the saving of updated data
    const onSubmitUpdateBooking = (e) => {
        e.preventDefault()

        const booking = {
            class_booking_id: id,
            booking_date: date,
            class_trainer_name: classTrainerName,
            class_id: classID,
        }

        fetch("/api/class_bookings/update", {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                navigate("/ListClassBooking")
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
        <input type="text" value={classTrainerName} onChange={(e) => setClassTrainerName(e.target.value)} />
        <label>Activity:</label>
        <select onChange={(e) => setClassID(e.target.value)}>
            {classList.map(booking =>
                <option selected={booking.class_id == classID} value={booking.class_id}>{booking.class_name}</option>
            )}
        </select>
        <input type="submit" value="Edit Booking" />
    </form>
}

