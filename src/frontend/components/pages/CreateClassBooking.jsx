import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const theme = createTheme();

export const CreateClassBooking = () => {
    const navigate = useNavigate()

    const [date, setDate] = useState("2022-1-1")
    const [classID, setClassID] = useState(1)
    const [trainerID, setTrainerID] = useState(4)
    const [status, setStatus] = useState("");
    

    // Load class data in dropdown
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
    }, [classList])

      // Load class data in dropdown
      const [trainerList, setTrainerList] = useState([])
      useEffect(() => {
          fetch("/api/trainers/all")
              .then(res => res.json())
              .then(res => {
                  if (res.status == 200) {
                      setTrainerList(res.trainer)
                  } else {
                      console.log("Error loading classes for select box")
                  }
              })
      }, [trainerList])

    const onSubmitCreateBooking = (e) => {
        e.preventDefault()
        const bookings = {
          booking_date: date,
          trainer_id: trainerID,
          class_id: classID,
       
        }

        fetch("/api/class_bookings/create", {
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
                navigate("/ListClassBookingAdmin")
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
    <ThemeProvider theme={theme}>
         <Box sx={{
          backgroundImage: (`url(${image})`),
          backgroundSize: 'cover',
          backgroundPosition: 'center', 
    }}>
         <Container component="main" maxWidth="xs">
         <CssBaseline />
         <Box
          sx={{
           
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{
              fontFamily: 'Bebas Neue',
          }}>
            Sign up
          </Typography>
          
          <Box component="form" onSubmit={(onSubmitCreateBooking)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <InputLabel id="date">Date</InputLabel>
                <TextField
                  name="date"
                  required
                  fullWidth
                  id="date"
                  type="date"
                  autoFocus
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="class_id">Class</InputLabel>
                    <FormControl>
                        <Select value={classID} onChange={(e) => setClassID(e.target.value)}>
                    {classList.map(bookings =>
                        <MenuItem value={bookings.class_id}>{bookings.class_name}</MenuItem>
                    )}
                    </Select>
                    </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="trainer_id">Trainer</InputLabel>
                    <FormControl>
                        <Select value={trainerID} onChange={(e) => setTrainerID(e.target.value)}>
                    {trainerList.map(bookings =>
                        <MenuItem value={bookings.trainer_id}>{bookings.first_name}</MenuItem>
                    )}
                    </Select>
                    </FormControl>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 15 }}
            >
              Create Booking
            </Button>
        </Grid>
        </Box>
    </Box>
    </Container>
    <Button
              type="submit"
              href="/ListClassBookingAdmin"
              variant="contained"
              sx={{ ml: 3, mt: 3, mb: 2 }}
            >
               Back
            </Button>
    </Box>
    </ThemeProvider>
)}