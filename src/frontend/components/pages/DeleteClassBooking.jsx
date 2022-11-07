import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";



export const DeleteClassBooking = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Handle delete button click
    const onClickDeleteButton = () => {
        fetch("/api/class_bookings/delete/" + id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    alert("Booking deleted")
                    navigate("/ListClassBooking")
                } else {
                    alert("Failed to delete booking")
                    navigate("/ListClassBooking")
                }
            })
            .catch(error => {
                alert("Request error")
                console.log(error)
            })
    }

    return <>
    <Container sx={{width: "400px", display: "flex", flexDirection: "column", pb: "150px"}}>
        <Typography
              variant="h3"
              sx={{
                  color: "Black",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Confirm Delete?</Typography>
        <Alert variant="outlined" severity="warning">
        Are you sure you want to delete booking with id {id}
      </Alert>
      <Button variant="contained" sx={{ mt:"15px", mb: "15px"}} onClick={onClickDeleteButton}>Delete</Button>
    </Container>
    </>
}