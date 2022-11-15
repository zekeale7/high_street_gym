import { Button, Table, TableContainer, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container, Stack } from '@mui/system';
import { Link } from 'react-router-dom';



export const Account = () => {
    // Request the list of all bookings and store in state
    const [customerData, setCustomerData] = useState([])

    // useEffect will run once by default, we use this to do an initial
    // fetch to the backend for the list of bookings.
    useEffect(() => {
        fetch("/api/logins/login")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setCustomerData(res.customer)
                } else if (res.status == 500) {
                    alert("A backend error occurred")
                } else {
                    alert("An unknown error occurred")
                }
            })
            .catch((error) => {
                alert("Request error!")
                console.log(error)
            })
    }, [])

    // Render the component and map each booking to a item component
    return (
   <Container>
       <Box>{customerData.first_name}</Box>
    </Container>
     
)}

