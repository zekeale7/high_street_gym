import { Button, Card, CardContent, CssBaseline, Grid, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"



const theme = createTheme();

export const EditAdmins = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Form input state
    const [adminFirstName, setAdminFirstName] = useState("John Doe")
    const [adminLastName, setAdminLastName] = useState("John Doe")
    const [loginID, setloginID] = useState([0])
    const [status, setStatus] = useState("");
 
    // Load the existing booking data for this record
    useEffect(() => {
        fetch("/api/admins/byid/" + id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    const admin = res.admin
                    setAdminFirstName(admin.first_name)
                    setAdminLastName(admin.last_name)
                    setloginID(admin.login_id)
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
        setStatus("Creating...");
        e.preventDefault()

        const admin = {
            admin_id: id,
            first_name: adminFirstName,
            last_name: adminLastName,
            login_id: loginID

        }

        fetch("/api/admins/update", {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(admin)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setStatus(res.message);
                    navigate("/ListAdmins");
                } else {
                    setStatus(res.message);
                }
            })
            .catch((error) => {
                setStatus("failed to fetch: " + error);
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
              >Edit Admin</Typography>
        <CssBaseline />
        <Box component="form" onSubmit={onSubmitUpdateBooking} sx={{ pt: 3, pb: 2 }}>
            <Card>
                <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="First Name:" type="text" value={adminFirstName} onChange={(e) => setAdminFirstName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth  label="Last Name:" type="text" value={adminLastName} onChange={(e) => setAdminLastName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                           <span>{status}</span>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, }}
                        >Update Admin</Button>
                    </Grid>
                </Grid>
            </CardContent>
            </Card>
        </Box>
        </Container>
        </Box>
        </ThemeProvider>
)}

