import { Button, Table, TableContainer, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container, Stack } from '@mui/system';
import { Link } from 'react-router-dom';



export const ListClassBooking = () => {
    // Request the list of all bookings and store in state
    const [classBookings, setClassBookings] = useState([])

    // useEffect will run once by default, we use this to do an initial
    // fetch to the backend for the list of bookings.
    useEffect(() => {
        fetch("/api/class_bookings/all")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClassBookings(res.bookings)
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
    return (
        <Box  sx={{backgroundColor: "lightblue"}}>
    <Container sx={{pt:"25px", pb: "25px"}}>
         <Container>
              <Typography
              variant="h1"
              sx={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Class Bookings</Typography>
          </Container>
        <TableContainer component={Paper} sx={{pb: "10%"}}>
            <Table sx={{ minWidth: 650, width: "100%"}} aria-label="simple table">
                <TableHead>
                <TableRow>
                <TableCell>Trainer Name:</TableCell>
                    <TableCell>Booking Date:</TableCell>
                    <TableCell>Level:</TableCell>
                    <TableCell>Class:</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {classBookings.map(class_booking => <BookingItem class_booking={class_booking} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
    </Box>
)}

const BookingItem = ({ class_booking }) => {
    // Store the activity details for this booking item in the list
    const [classes, setClasses] = useState({
        class_name: "Unknown",
        level: "Unknown"
    })

    // Load the activity details for this booking item
    useEffect(() => {
        fetch("/api/classes/byid/" + class_booking.class_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClasses(res.classes)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])

    return   <TableRow
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
        <TableCell component="th" scope="row">{class_booking.class_trainer_name}</TableCell>
        <TableCell component="th" scope="row">{class_booking.booking_date}</TableCell>
        <TableCell component="th" scope="row">{classes.level}</TableCell>
        <TableCell component="th" scope="row">{classes.class_name}</TableCell>

        <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/EditClassBookings/" + class_booking.class_booking_id}>Edit</Button>
        <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/DeleteClassBooking/" + class_booking.class_booking_id}>Delete</Button>
        </TableRow>

}