import { Button, Card, CardContent, CssBaseline, Grid, MenuItem, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"



const theme = createTheme();

export const EditClasses = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Form input state
    const [className, setClassName] = useState("John Doe")
    const [durationMinutes, setDurationMinutes] = useState("John Doe")
    const [classLevel, setClassLevel] = useState("John Doe")
    const [status, setStatus] = useState("");

 
    // Load the existing booking data for this record
    useEffect(() => {
        fetch("/api/classes/byid/" + id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    const classes = res.classes
                    setClassName(classes.class_name)
                    setDurationMinutes(classes.duration_minutes)
                    setClassLevel(classes.level)
                } else {
                    console.log("Request error")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // Handle the saving of updated data
    const onSubmitUpdateBooking = (e) => {
        setStatus("Updating...");
        e.preventDefault()

        const classes = {
            class_id: id,
            class_name: className,
            duration_minutes: durationMinutes,
            level: classLevel,

        }

        fetch("/api/classes/update", {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(classes)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    alert(res.message)
                    setStatus(res.message);
                    navigate("/ListClasses");
                } else {
                    setStatus(res.message);
                }
            })
            .catch((error) => {
                setStatus("failed to fetch: " + error);
                alert(error)
            });
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
              >Edit Class</Typography>
        <CssBaseline />
        <Box component="form" onSubmit={onSubmitUpdateBooking} sx={{ pt: 3, pb: 2 }}>
            <Card>
                <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Class Name:" type="text" value={className} onChange={(e) => setClassName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth  label="Duration:" type="text" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            select
                            fullWidth  
                            label="Level:" 
                            type="text" 
                            value={classLevel} 
                            onChange={(e) => setClassLevel(e.target.value)} 
                        >
                            <MenuItem value={"Easy"}>Easy</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Hard"}>Hard</MenuItem>
                        </TextField>
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
)}

