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
import { useNavigate } from "react-router-dom";
import "../../style.css"


const theme = createTheme();

export const SignUp = () => {

  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setStatus("Signing up...");

    fetch("/api/customers/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.status == 200) {
                setStatus(res.message);
                navigate("/Login");
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
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: "500px" }} >
            <Grid container spacing={4}>
            <Grid item xs={12}>
                <TextField
                  name="login_username"
                  required
                  fullWidth
                  id="login_username"
                  label="Username"
                  autoFocus
                  {...register("username")}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  {...register("first_name")}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("last_name")}
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  
                  {...register("phone")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="country"
                  type="country"
                  id="country"
                  
                  {...register("country")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="State"
                  type="state"
                  id="state"
                  autoComplete="state"
                  {...register("state")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="city"
                  id="city"
                  {...register("city")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  label="Street"
                  type="street"
                  id="street"
                  {...register("street")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="postcode"
                  label="Postcode"
                  type="postcode"
                  id="postcode"
                  {...register("postcode")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <span>{status}</span>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
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