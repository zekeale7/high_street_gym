import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {shadows} from '@mui/system'
import "../style.css"



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export function Footer() {
  return (
    <Box sx={{display: "flex"}}>
    <Box sx={{ 
      bgcolor: 'lightgrey', 
      p: 6, 
      width: "100%",
     
      }}  
      component="footer">
    <Typography variant="h6" align="center" sx={{
      fontFamily: 'Bebas Neue'
    }} gutterBottom>
      Footer
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
      sx={{
        fontFamily: 'Bebas Neue'
      }}
    >
      Something here to give the footer a purpose!
    </Typography>
    <Copyright />
  </Box>
  </Box>
  );
}