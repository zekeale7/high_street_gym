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

export const CreateClasses = () => {
    const navigate = useNavigate()

  
    const [classID, setClassID] = useState("");
    const { register, handleSubmit } = useForm();

    const onSubmitCreateBooking = (e) => {

        fetch("/api/classes/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(e)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                // You would probably want to redirect (navigate) to another page here.
                navigate("/ListClasses")
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
          
          <Box component="form" onSubmit={handleSubmit(onSubmitCreateBooking)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
                <TextField
                  name="class_name"
                  required
                  fullWidth
                  id="class_name"
                  label="Class"
                  autoFocus
                  {...register("class_name")}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="duration_minutes"
                  label="Duration Minutes"
                  name="duration_minutes"
                  {...register("duration_minutes")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                      <TextField 
                      {...register("level")}
                      value={classID} 
                      label="Select Level" 
                      onChange={(e) => setClassID(e.target.value)} 
                      select
                      fullWidth>
                          <MenuItem value={"Easy"}>Easy</MenuItem>
                          <MenuItem value={"Medium"}>Medium</MenuItem>
                          <MenuItem value={"Hard"}>Hard</MenuItem>
                    </TextField>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 15 }}
            >
              Sign Up
            </Button>
        </Grid>
        </Box>
    </Box>
    </Container>
    <Button
              type="submit"
              href="/ListClasses"
              variant="contained"
              sx={{ ml: 3, mt: 3, mb: 2 }}
            >
               Back
            </Button>
    </Box>
    </ThemeProvider>
)}