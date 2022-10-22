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
    <div> 
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Class Name</TableCell>
            <TableCell align="right">Duration Minutes</TableCell>
            <TableCell align="right">level</TableCell>
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

              <Button variant="contained" component={Link} to={"/EditClasses"}>Edit</Button>
              <Button variant="contained" href="/DeleteClasses">Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
