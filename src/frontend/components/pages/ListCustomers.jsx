import { Button, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';

export const ListCustomers = ({customer}) => {
  
  const [data, setData] = useState([]);


  const getCustomerList = () => {
    fetch('/api/customers/all')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setData(json);
    })
  }

  useEffect(() => {
    getCustomerList();
  }, [])

  return (
    <Box  sx={{backgroundColor: "lightblue"}}>
    <Container>
              <Typography
              variant="h1"
              sx={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Customers</Typography>
               <Button variant="contained" sx={{ mt:"15px", mb: "15px", mr: "15px"}} href={"/api/export/member-list"}>Download Customer List XML</Button>
          </Container>
      <Container sx={{pt:"25px", pb: "25px"}}>
      <TableContainer component={Paper} sx={{pb: "10%"}}>
      <Table sx={{ minWidth: 650, width: "100%"}} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Customer ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right"></TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{item.customer_id}</TableCell>
              <TableCell component="th" scope="row">{item.first_name}</TableCell>
              <TableCell align="right">{item.last_name}</TableCell>
              <TableCell align="right">{item.phone}</TableCell>
              <TableCell align="right">{item.email}</TableCell>
              
              <TableCell align="right">
              <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/EditCustomers/" + item.customer_id}>Edit</Button>
              <Button variant="contained" component={Link} to={"/DeleteCustomer/" + item.customer_id}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </Box>
  );
}
