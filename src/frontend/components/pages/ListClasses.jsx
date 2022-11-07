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


export const ListClasses = () => {
  
  const [data, setData] = useState([]);

  const getClassList = () => {
    fetch('/api/classes/all')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setData(json);
    })
  }

  useEffect(() => {
    getClassList();
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
                >Classes</Typography>
            </Container>
    <Container sx={{pt:"25px", pb: "25px"}}>
      <TableContainer component={Paper} sx={{pb: "10%"}}>
      <Table sx={{ minWidth: 650, width: "100%"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Class</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right"></TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{item.class_name}</TableCell>
              <TableCell align="right">{item.duration_minutes}</TableCell>
              <TableCell align="right">{item.level}</TableCell>
              <TableCell>
              <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/EditClasses/" + item.class_id}>Edit</Button>
              <Button variant="contained" component={Link} to={"/DeleteClasses/" + item.class_id}>Delete</Button>
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
