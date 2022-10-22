import { Button, Typography } from '@mui/material';
import * as React from 'react';
import "../../style.css"


export function ClassPage(){
  return (
  <div>
     <Typography variant="h1"
      sx={{
        color: "black",
        textAlign: "center",
        fontFamily: 'Bebas Neue',
        pt: '5rem'
                }} >Book Classes</Typography>
    <Button href="/ListClassBooking">See Class Times</Button>



  </div>
  )
}