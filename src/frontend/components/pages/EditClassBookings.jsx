import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from '/src/images/pexels-scott-webb-3255761.jpg'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../style.css"
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material"


const theme = createTheme();

export const EditClassBookings = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Form input state
    const [date, setDate] = useState("2022-1-1")
    const [trainerID, setTrainerID] = useState(1)
    const [classID, setClassID] = useState(1)
    const [status, setStatus] = useState("");

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

     // Activity list items
     const [trainerList, setTrainerList] = useState([])
     useEffect(() => {
         fetch("/api/trainers/all")
             .then(res => res.json())
             .then(res => {
                 if (res.status == 200) {
                    setTrainerList(res.trainer)
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
                    setTrainerID(booking.trainer_id)
                    setClassID(booking.class_id)
                } else {
                    console.log("Request error")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [classList], [trainerList])

    

    // Handle the saving of updated data
    const onSubmitUpdateBooking = (e) => {
        e.preventDefault()

        const booking = {
            class_booking_id: id,
            booking_date: date,
            trainer_id: trainerID,
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
                navigate("/ListClassBookingAdmin")
                // You would probably want to redirect (navigate) to another page here.
            })
            .catch(error => {
                alert(error)
            })
    }

    return(
    <ThemeProvider theme={theme} >
    <Box sx={{backgroundColor: "lightBlue", pb: "20%" }}>
        <Container component="main" maxWidth="xs" >
        <Typography
              variant="h1"
              sx={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Edit Class Bookings</Typography>
        <CssBaseline />
            <Box component="form" onSubmit={onSubmitUpdateBooking} sx={{ pt: 3, pb: 2 }}>
                <Card>
                    <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl>
                            <Select value={classID} onChange={(e) => setClassID(e.target.value)}>
                                {classList.map(booking =>
                                    <MenuItem selected={booking.class_id == classID} value={booking.class_id}>{booking.class_name}</MenuItem>
                                )}
                            </Select>
                            </FormControl>
                         </Grid>
                         <Grid item xs={12} sm={6}>
                            <FormControl>
                            <Select value={trainerID} onChange={(e) => setTrainerID(e.target.value)}>
                                {trainerList.map(booking =>
                                    <MenuItem selected={booking.trainer_id == trainerID} value={booking.trainer_id}>{booking.first_name} {booking.last_name}</MenuItem>
                                )}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                    <span>{status}</span>
                        <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, }}
                        >Update Class</Button>
                        </Grid>
                    </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    </Box>
    </ThemeProvider>
)
}

