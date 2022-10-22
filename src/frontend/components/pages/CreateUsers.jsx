import * as React from 'react';
import "../../style.css"
import Container from '@mui/material/Container';
import { FormComponent } from '../FormComponent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  Card  from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import image from '/src/images/pexels-anni-roenkae-2457278.jpg'
import { CssBaseline } from '@mui/material';

export function CreateUsers(){
  return (
 
    <Box sx={{
      backgroundImage: (`url(${image})`),
      backgroundsize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden'
    }}>
    <Container component='main' maxWidth='xs' >
    <CssBaseline />
      <Card variant="outlined" 
      sx={{  
          mx: "auto", 
          width: 500,
          my: 5
       
      }}>
        <CardContent>
        <Typography  
        variant="h2"
        sx={{
          color: "Black",
          textAlign: "center",
          fontFamily: 'Bebas Neue',
          pt: '5rem'
           }} 
          >Create User</Typography>
        <FormComponent />
        </CardContent>
      </Card>
     
  </Container>
  </Box>
  )
}