import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import image from '/src/images/pexels-anni-roenkae-2457278.jpg'

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  

  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export function AboutUs() {

  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  );

  return (
  <Box sx={{
    backgroundImage: (`url(${image})`),
    backgroundSize: 'cover',
    backgroundPosition: 'center',}}>
  
  <Container sx={{
    width: '500px',
    pb:'40px',
  }}>
  <Box>
    <Typography variant="h1"
      sx={{
        color: "black",
        textAlign: "center",
        fontFamily: 'Bebas Neue',
        pt: '5rem'
                }} >About Us</Typography>
    
    <Root>
      {content}
      <Divider>CENTER</Divider>
      {content}
      <Divider textAlign="left">LEFT</Divider>
      {content}
      <Divider textAlign="right">RIGHT</Divider>
      {content}
      <Divider>
        <Chip label="CHIP" />
      </Divider>
      {content}
    </Root>
  </Box>
  </Container>
  </Box>

  );
};

