import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

export const ListClassBookingMember = () => {
    // Request the list of all bookings and store in state
    const [bookings, setBookings] = useState([])

    // useEffect will run once by default, we use this to do an initial
    // fetch to the backend for the list of bookings.
    useEffect(() => {
        fetch("/api/class_bookings/all")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setBookings(res.bookings)
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
        <Container>
            <h1>Available Classes</h1>
            <Button variant="contained" sx={{ mt:"15px", mb: "15px", mr: "15px"}} href={"/api/export/class-booking-list"}>Download Class Booking List XML</Button>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
              
            }}>
        {bookings.map(booking => <BookingItem booking={booking} />)}
        </Box>
        </Container>
  
)}

const BookingItem = ({ booking }) => {
    // Store the activity details for this booking item in the list
    const [classes, setClasses] = useState({
        class_name: "Unknown",
        level: "Unknown"
    })

    // Load the activity details for this booking item
    useEffect(() => {
        fetch("/api/classes/byid/" + booking.class_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClasses(res.classes)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])

        // Store the activity details for this booking item in the list
        const [trainers, setTrainers] = useState({
        })
    
        // Load the activity details for this booking item
        useEffect(() => {
            fetch("/api/trainers/byid/" + booking.trainer_id)
                .then(res => res.json())
                .then(res => {
                    if (res.status == 200) {
                        setTrainers(res.trainer)
                    } else {
                        console.log("Error loading trainer for booking item")
                    }
                })
        }, [])

    return( 
        <Root sx={{
            display: 'flex',
            flexDirection: 'column',
            
        }}>
        <Typography component="h1" sx={{
                  color: "black",
                  fontSize: "30px",
                  fontFamily: 'Bebas Neue',
        }}>{trainers.first_name} {trainers.last_name}</Typography>
        <span>Date: {booking.booking_date}</span>
        <span>Level: {classes.level}</span>
        <span>Class: {classes.class_name}</span>
        <Button variant="contained" component={Link} to={"/CreateClassBookingMember/" + booking.class_booking_id} sx={{
                fontSize: '13px',
                width: '200px',
                padding: '7px',
                mb: '12px',
            }}>Book Now</Button>
            <Divider sx={{mb: "20px",}}></Divider>
        </Root>
)}