import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import * as React from 'react';
import "../../style.css"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';


export function DeleteCustomer (){

    const [status, setStatus] = useState("");

    const { handleSubmit } = useForm();
  
    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState([]);

    const getCustomerList = () => {
        fetch('/api/customers/all')
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setCustomerData(json);
        })
      }
    
      useEffect(() => {
        getCustomerList();
      }, [])
  
    const onSubmit = () => {

    setStatus("Creating...");

    fetch("/api/customers/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status == 200) {
                    setStatus(res.message);
                    navigate("/Login");
                } else {
                    setStatus(res.message);
                }
            })
            .catch((error) => {
                setStatus("failed to fetch: " + error);
            });
 
  return(
    <Box component="form">
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
              <Button variant="outlined"  >Delete</Button>
          <Button variant="outlined" href="/ListCustomers">Back</Button>
        </Container>
    </Box>
  )}}
    