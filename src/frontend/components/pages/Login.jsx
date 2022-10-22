import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import image from '/src/images/pexels-anni-roenkae-2457278.jpg'
import "../../style.css"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";



const theme = createTheme();

export const Login = ({login}) => {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
     const [status, setStatus] = useState("");

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("");

    const onEmailChange = (event) => setEmail(event.target.value)
    const onPasswordChange = (event) => setPassword(event.target.value);

    
    const onLoginClicked = (event) => {
        event.preventDefault();

        // TODO: Debug output - delete later
        console.log("The Login button was pressed");
        console.log("The email is " + email);
        console.log("The password is " + password);

        // TODO: Add validation logic here
        if(!/[a-zA-Z0-9]*@[a-zA-Z0-9]*\.com/.test(email)){
            // TODO: SHow error message

            setErrorMessage("Invalid email format")
            return;
        }

        if(!/[a-zA-Z0-9]{8,24}/.test(password)){
            setErrorMessage("Invalid password")
            return;
        }

        // Reset the error message
        setErrorMessage("")

        // TODO: Construct body data object
        const bodyData = {
            email: email,
            password: password
        }
        // TODO: Send fetch request to server
        fetch("/api/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(bodyData),
        })
        .then((response) => response.json())
        .then((responseData) => {
            // TODO: Handle response
 
        })
        .catch(error =>{
            // TODO: Handle error
          
        })
    };

    const onSubmit = (data) => {
      setStatus("logging in...");
      login(data.username, data.password)
          .then((message) => {
              setStatus(message);
              navigate("/Account");
          })
          .catch((error) => {
              setStatus(error);
          });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: (`url(${image})`),
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        
                        onChange={onEmailChange}
                        autoFocus
                        {...register("username")}
                    />
              <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={onPasswordChange}
                        id="password"
                        {...register("password")}
                     
                    />
             <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
              Login
            </Button>
             <Grid item>
                {/* <span>{errorMessage}</span> */}
                <span>{status}</span>
             </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}