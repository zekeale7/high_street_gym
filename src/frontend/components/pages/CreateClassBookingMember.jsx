import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"


export const CreateClassBookingMember = () => {
    const navigate = useNavigate()

    const [classBookingID, setClassBookingID] = useState("John Doe")
    const [classID, setClassID] = useState(1)
   

    const [customerID, setCustomerID] = useState(1)
   // Load the existing booking data for this record
   useEffect(() => {
    fetch("/api/customers/byid/" + id)
        .then(res => res.json())
        .then(res => {
            if (res.status == 200) {
                const customer = res.customer
                setCustomerID(customer.customer_id)
            } else {
                console.log("Request error")
            }
        })
        .catch(error => {
            console.log(error)
        })
}, [])

    const onSubmitCreateBooking = (e) => {
        e.preventDefault()
        const bookings = {
          class_booking_id: classBookingID,
          customer_id: customerID,
        }

        fetch("/api/class_bookings_members/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(bookings)
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
        <label>Customer ID:</label>
        <input type="text" value={customerID} onChange={(e) => setCustomerID(e.target.value)} />
        <label>Class Booking ID:</label>
        <input type="text" value={classBookingID} onChange={(e) => setClassBookingID(e.target.value)} />
        <label>Class:</label>
        <input type="submit" value="Create Booking" />
    </form>
}