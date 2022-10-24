import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Typography } from "@mui/material";

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

export const Account = () => {
   
    return (
        <Container>
            <h1>Blogs</h1>
        </Container>
    );
};