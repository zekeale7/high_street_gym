import { Button, Table, TableContainer, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container} from '@mui/system';
import { Link } from 'react-router-dom';



export const ListBookedClasses = () => {
    // Request the list of all bookings and store in state
    const [classBookings, setClassBookings] = useState([])

    // useEffect will run once by default, we use this to do an initial
    // fetch to the backend for the list of bookings.
    useEffect(() => {
        fetch("/api/class_bookings_members/all")
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
    <Box sx={{backgroundColor: "lightblue"}}>
          <Container>
              <Typography
              variant="h1"
              sx={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Member Bookings</Typography>
              <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/CreateClassBookingMember"}>Create</Button>
          </Container>
    <Container sx={{pt:"25px", pb: "25px"}}>
       
        <TableContainer component={Paper} sx={{pb: "10%"}}>
            <Table sx={{ minWidth: 650, width: "100%"}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Customer Name:</TableCell>
                    <TableCell>Booking Date:</TableCell>
                    <TableCell>Trainer:</TableCell>
                    <TableCell>Class Name:</TableCell>
                   
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

    const [classes, setClasses] = useState({
        class_name: "Unknown",
        booking_date: "Unknown",
        level: "Unknown"
    })
      const [bookings, setBookings] = useState({})
   

    // Load classes from get_class_by_booking_id 
    useEffect(() => {
        fetch("/api/class_bookings/class_by_booking_id/" + class_booking.class_booking_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClasses(res.booking)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])

     // Load class bookings data
     useEffect(() => {
        fetch("/api/class_bookings/byid/" + class_booking.class_booking_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setBookings(res.booking)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])

      // Load trainers bookings data
      useEffect(() => {
        fetch("/api/class_bookings/byid/" + class_booking.class_booking_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setBookings(res.booking)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])

    return   <TableRow
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
        <TableCell component="th" scope="row">{class_booking.first_name} {class_booking.last_name}</TableCell>
        <TableCell component="th" scope="row">{bookings.booking_date}</TableCell>
        <TableCell component="th" scope="row">{bookings.class_trainer_name}</TableCell>
        <TableCell component="th" scope="row">{classes.class_name}</TableCell>

        <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/EditClassBookings/" + class_booking.class_booking_id}>Edit</Button>
        <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/DeleteClassBooking/" + class_booking.class_booking_id}>Delete</Button>
        </TableRow>

}