import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { useEffect } from 'react';



const theme = createTheme();

export const CreateBlogs = () => {

  const { register, handleSubmit, setValue } = useForm();
  const [status, setStatus] = useState("");
  const [identity, setIdentity] = useState([])

  const navigate = useNavigate();



   // Load the login details for this booking item
   useEffect(() => {
    fetch("/api/logins/identity")
        .then(res => res.json())
        .then(res => {
            if (res.status == 200) {

              if(res.body = res.customer)
              {
                setIdentity(res.customer)
                setValue("login_id", res.customer.login_id)
              } 

              if(res.body = res.trainer)
              {
                setIdentity(res.trainer)
                setValue("login_id", res.trainer.login_id)
              }
         
            } else {
                console.log("Error loading activity for booking item")
            }
        })
}, [])

  const onSubmit = (data) => {
    setStatus("Creating...");

    fetch("/api/blogs/create", {
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
                navigate("/ListBlogs");
                alert(res.message)
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
            Create Blog
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  name="blog_title"
                  required
                  fullWidth
                  id="blog_title"
                  label="Blog Title"
                  autoFocus
                  {...register("blog_title")}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="blog_content"
                  label="Write content here"
                  multiline
                  rows={4}
                  id="blog_content"
                  {...register("blog_content")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 54 }}
            >
              Post
            </Button>
            <span>{status}</span>
          </Box>
        </Box>
   
      </Container>
      <Button
              type="submit"
              href="/ListBlogs"
              variant="contained"
              sx={{ ml: 3, mt: 3, mb: 2 }}
            >
               Back
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