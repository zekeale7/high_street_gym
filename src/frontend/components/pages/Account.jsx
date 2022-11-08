import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";



export const Account = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

      // Form input state
      const [loginID, setloginID] = useState([0])

   // Load the existing booking data for this record
   useEffect(() => {
    fetch("/api/logins/byid/" + id)
        .then(res => res.json())
        .then(res => {
            if (res.status == 200) {
                const trainer = res.trainer
                setTrainerFirstName(trainer.first_name)
                setTrainerLastName(trainer.last_name)
                setloginID(trainer.login_id)
            } else {
                console.log("Request error")
            }
        })
        .catch(error => {
            console.log(error)
        })
}, [])


    return <>
    <Container sx={{width: "400px", display: "flex", flexDirection: "column", pb: "150px"}}>
        <Typography
              variant="h3"
              sx={{
                  color: "Black",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Confirm Delete?</Typography>
        <Alert variant="outlined" severity="warning">
        Are you sure you want to delete booking with id {id}
      </Alert>
      <Button variant="contained" sx={{ mt:"15px", mb: "15px"}} onClick={onClickDeleteButton}>Delete</Button>
    </Container>
    </>
}