import * as React from 'react';
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
import { useNavigate, useParams } from "react-router-dom";
import "../../style.css"
import { useEffect } from 'react';
import { Divider } from '@mui/material';


const theme = createTheme();

export const CreateClassBookingMember = () => {

  const { id } = useParams()

  const { register, handleSubmit, setValue} = useForm();
  const [status, setStatus] = useState("");
  // const [classBookingID, setClassBookingID] = useState('')
  const [identity, setIdentity] = useState("John Doe")
  const [bookingID, setBookingID] = useState("John Doe")
  const [trainers, setTrainers] = useState("John Doe")

    // Load the existing booking data for this record
    useEffect(() => {
      fetch("/api/class_bookings/byid/" + id)
          .then(res => res.json())
          .then(res => {
              if (res.status == 200) {
                  setValue("class_booking_id", res.booking.class_booking_id)
                  setBookingID(res.booking)
                } else {
                  console.log("Request error")
              }
          })
          .catch(error => {
              console.log(error)
          })
  }, [])
  
  
   // Load the login details for this booking item
   useEffect(() => {
    fetch("/api/logins/identity")
        .then(res => res.json())
        .then(res => {
            if (res.status == 200) {

              if(res.body = res.customer)
              {
                setIdentity(res.customer)
                setValue("customer_id", res.customer.customer_id)
                setValue("first_name", res.customer.first_name)
                setValue("last_name", res.customer.last_name)
              } 

         
            } else {
                console.log("Error loading activity for booking item")
            }
        })
}, [])
  

  const navigate = useNavigate();

  const onSubmit = (e) => {
    setStatus("Creating...");

    fetch("/api/class_bookings_members/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.status == 200) {
                alert(res.message)
                setStatus(res.message);
                navigate("/Account");
            } else {
                setStatus(res.message);
            }
        })
        .catch((error) => {
            setStatus("failed to fetch: " + error);
        });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  };

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
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Container>
              <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "15px",
    
                }}>
                <Typography component="h1" sx={{
                  color: "black",
                  fontSize: "30px",
                  fontFamily: 'Bebas Neue',
                }}>Confirm Booking Details</Typography>
                 <Divider sx={{mb: "20px",}}></Divider>
                  <span>Full Name: {identity.first_name} {identity.last_name}</span>
                  <span>Class Booking ID: {bookingID.class_booking_id}</span>  
                  <Divider sx={{mt: "20px", mb: "20px",}}></Divider> 
                </Box>
          </Container> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm 
            </Button>
            <span>{status}</span>
          </Box>
        </Box>
      </Container>
      <Button
              type="submit"
              href="/ListClassBookingMember"
              variant="contained"
              sx={{ ml: 3, mt: 3, mb: 55 }}
            >
               Cancel Booking
            </Button>
      </Box>
    </ThemeProvider>
  );
}

{/*export const Signup = () => {
    return <section>
         
        <h2>Sign Up</h2>
        <form>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" name="first_name" id="first_name"/>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" name="last_name" id="last_name"/>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email"/>
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password"/>
            <label htmlFor="password_repeat">Repeat Password:</label>
            <input type="text" name="password_repeat" id="password_repeat" />
            <input type="button" value="Sign Up" />

        </form>

</section>
}*/}