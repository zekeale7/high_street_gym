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
import { Box, Container, Stack } from '@mui/system';
import { Link } from 'react-router-dom';


export const ListAdmins = () => {
  
  const [data, setData] = useState([]);

  const getAdminList = () => {
    fetch('/api/admins/all')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setData(json);
    })
  }

  useEffect(() => {
    getAdminList();
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
                >Admins</Typography>
    <Button variant="contained" sx={{mr: "15px"}}  component={Link} to="/CreateAdmin">Create</Button>
            </Container>
    <Container sx={{pt:"25px", pb: "25px"}}>
      <TableContainer component={Paper} sx={{pb: "10%"}}>
      <Table sx={{ minWidth: 650, width: "100%"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{item.first_name}</TableCell>
              <TableCell align="right">{item.last_name}</TableCell>
              <TableCell align="right">
              <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/EditAdmins/" + item.admin_id}>Edit</Button>
              <Button variant="contained" component={Link} to={"/DeleteAdmins/" + item.admin_id}>Delete</Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </Box>
  );
}
