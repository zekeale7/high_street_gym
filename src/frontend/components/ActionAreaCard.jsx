import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from '@mui/system';

export function ActionAreaCard() {

  return (
    <Container>
    <Card sx={{ 
      maxWidth: 345,
      boxShadow: 5
      }}>
            <CardActionArea>
            <CardContent>
          <Typography>asd</Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
    </Card>
 
    </Container>
  );
}
