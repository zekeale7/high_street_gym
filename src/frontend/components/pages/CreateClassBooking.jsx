import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"


export const CreateClassBooking = () => {
    const navigate = useNavigate()

    const [date, setDate] = useState("2022-1-1")
    const [ClassTrainerName, setClassTrainerName] = useState("John Doe")
    const [classID, setClassID] = useState(1)

    const [classList, setClassList] = useState([])
    useEffect(() => {
        fetch("/api/classes/all")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClassList(res.classes)
                } else {
                    console.log("Error loading classes for select box")
                }
            })
    }, [])

    const onSubmitCreateBooking = (e) => {
        e.preventDefault()
        const classes = {
          booking_date: date,
          class_trainer_name: ClassTrainerName,
          class_id: classID,
        }

        fetch("/api/class_bookings/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(classes)
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
        <input type="text" value={ClassTrainerName} onChange={(e) => setClassTrainerName(e.target.value)} />
        <label>Class:</label>
        <select value={classID} onChange={(e) => setClassID(e.target.value)}>
            {classList.map(classes =>
                <option value={classes.class_id}>{classes.class_name}</option>
            )}
        </select>
        <input type="submit" value="Create Booking" />
    </form>
}