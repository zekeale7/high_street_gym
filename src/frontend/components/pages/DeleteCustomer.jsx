import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import * as React from 'react';
import "../../style.css"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


export function DeleteCustomer (){

    const [status, setStatus] = useState("");

    const { handleSubmit } = useForm();
  
    const navigate = useNavigate();
  
    const onSubmit = (data) => {
      setStatus("Deleting...");
  
      fetch("/api/customers/delete", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })
          .then((res) => res.json())
          .then((res) => {
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
  return(
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Container>
            <Typography
              variant="h1"
              sx={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Delete Customer</Typography>
              <Button variant="outlined" onClick={handleSubmit(onSubmit)} >Delete</Button>
          <Button variant="outlined" href="/ListCustomers">Back</Button>
        </Container>
    </Box>
  )
    }}