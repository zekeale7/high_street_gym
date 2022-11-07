import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"



export const DeleteBookingDemo = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Handle delete button click
    const onClickDeleteButton = () => {
        fetch("/api/bookings_demo/delete/" + id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    alert("Booking deleted")
                    navigate("/BlogsDemo")
                } else {
                    alert("Failed to delete")
                }
            })
            .catch(error => {
                alert("Request error")
                console.log(error)
            })
    }

    return <>
        <h3>Confirm delete?</h3>
        <span>Are you sure you want to delete booking with id {id}</span>
        <input type="button" value="Delete" onClick={onClickDeleteButton} />
    </>
}