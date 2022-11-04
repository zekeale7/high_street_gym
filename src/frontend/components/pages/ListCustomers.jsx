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

export const ListCustomers = ({customer}) => {
  
  const [data, setData] = useState([]);

  const deleteCustomer = (customer_id) => {
    fetch("api/customers/delete/" + customer_id, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((response) => {
      if (response.status == 200){
        alert(response),
        window.location.href = "/ListCustomers"
        setData(
          data.filter(
            (customer) => customer.customer_id != customer_id,
          )
        )
      }
    })
  }

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
    <div> 
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Customer ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
       
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
           

              <Button variant="contained" onClick={() => deleteCustomer(item.customer_id)}>Delete</Button>
     
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
