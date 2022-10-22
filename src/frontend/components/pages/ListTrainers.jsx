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
import { Box, Stack } from '@mui/system';

export const ListTrainers = () => {
  
  const [data, setData] = useState([]);

  const getTrainerList = () => {
    fetch('/api/trainers/all')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setData(json);
    })
  }

  useEffect(() => {
    getTrainerList();
  }, [])

  return (
    <div> 
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
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

              <Button variant="contained" href="/EditUsers">Edit</Button>
              <Button variant="contained">Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
