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
    const [classBookingsMembers, setClassBookingsMembers] = useState([])
    const [classBookings, setClassBookings] = useState([])

    // useEffect will run once by default, we use this to do an initial
    // fetch to the backend for the list of bookings.
    useEffect(() => {
        fetch("/api/class_bookings_members/all")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClassBookingsMembers(res.bookings)
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
          </Container>
    <Container sx={{pt:"25px", pb: "25px"}}>
       
        <TableContainer component={Paper} sx={{pb: "10%"}}>
            <Table sx={{ minWidth: 650, width: "100%"}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Customer Name:</TableCell>
                    <TableCell>Booking Member ID:</TableCell>
                    <TableCell>Customer ID:</TableCell>
                    <TableCell>Booking ID:</TableCell>       
                </TableRow>
                </TableHead>
                <TableBody>
                {classBookingsMembers.map(class_booking => <BookingItem class_booking={class_booking} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
    </Box>
)}

const BookingItem = ({ class_booking }) => {

    const [classes, setClasses] = useState({})
      const [bookings, setBookings] = useState({})   

    // Load classes from get_class_by_booking_id 
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

    // Load classes from get_class_by_booking_id 
    useEffect(() => {
        fetch("/api/class_bookings/booking_details/" + class_booking.class_booking_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClasses(res.booking)
                    
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])


    return   <TableRow
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
        <TableCell component="th" scope="row">{class_booking.first_name} {class_booking.last_name}</TableCell>
        <TableCell component="th" scope="row">{class_booking.class_bookings_members_id}</TableCell>
        <TableCell component="th" scope="row">{class_booking.customer_id}</TableCell>
        <TableCell component="th" scope="row">{class_booking.class_booking_id}</TableCell>
   



        <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/EditBookedClasses/" + class_booking.class_booking_members_id}>Edit</Button>
        <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/DeleteBookedClasses/" + class_booking.class_bookings_members_id}>Delete</Button>
        </TableRow>

}