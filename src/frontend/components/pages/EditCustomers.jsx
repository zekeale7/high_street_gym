import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardContent, CssBaseline, Grid, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react"

const theme = createTheme();

export const EditCustomers = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Form input state
    const [customerFirstName, setCustomerFirstName] = useState("john Doe")
    const [customerLastName, setCustomerLastName] = useState("john Doe")
    const [customerPhone, setCustomerPhone] = useState("######")
    const [customerEmail, setCustomerEmail] = useState("john@gmail.com")
    const [customerCountry, setCustomerCountry] = useState("QLD")
    const [customerState, setCustomerState] = useState("QLD")
    const [customerCity, setCustomerCity] = useState("Brisbane")
    const [customerStreet, setCustomerStreet] = useState("john St")
    const [customerPostcode, setCustomerPostcode] = useState("0000")
    const [status, setStatus] = useState("");

    // Load the existing booking data for this record
    useEffect(() => {
        fetch("/api/customers/byid/" + id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    const customer = res.customer
                    setCustomerFirstName(customer.first_name)
                    setCustomerLastName(customer.last_name)
                    setCustomerPhone(customer.phone)
                    setCustomerEmail(customer.email)
                    setCustomerCountry(customer.country)
                    setCustomerState(customer.state)
                    setCustomerCity(customer.city)
                    setCustomerStreet(customer.street)
                    setCustomerPostcode(customer.postcode)
                    

                } else {
                    console.log("Request error")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // Handle the saving of updated data
    const onSubmitUpdateTrainer = (e) => {
        e.preventDefault()

        const customer = {
            customer_id: id,
            first_name: customerFirstName,
            last_name: customerLastName,
            phone: customerPhone,
            email: customerEmail,
            country: customerCountry,
            state: customerState,
            city: customerCity,
            street: customerStreet,
            postcode: customerPostcode
        }

        fetch("/api/customers/update", {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setStatus(res.message);
                    navigate("/ListCustomers");
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
    <Typography
              variant="h3"
              sx={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Edit Customer</Typography>
    <Container component="main" maxWidth="xs" >
    <CssBaseline />
    <Box component="form" onSubmit={onSubmitUpdateTrainer} sx={{ pt: 3, pb: 1 }}>
        <Card>
            <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name:" type="text" value={customerFirstName} onChange={(e) => setCustomerFirstName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth  label="Last Name:" type="text" value={customerLastName} onChange={(e) => setCustomerLastName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Phone:" type="number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth  label="Email:" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Country:" type="text" value={customerCountry} onChange={(e) => setCustomerCountry(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth  label="State:" type="text" value={customerState} onChange={(e) => setCustomerState(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Street:" type="text" value={customerStreet} onChange={(e) => setCustomerStreet(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth  label="City:" type="text" value={customerCity} onChange={(e) => setCustomerCity(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Postcode:" type="number" value={customerPostcode} onChange={(e) => setCustomerPostcode(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth  label="Last Name:" type="text" value={customerLastName} onChange={(e) => setCustomerLastName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={12}>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, }}
                    >Update Trainer</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                <span>{status}</span>
                </Grid>
            </Grid>
        </CardContent>
        </Card>
    </Box>
    </Container>
    </Box>
    </ThemeProvider>
)}

