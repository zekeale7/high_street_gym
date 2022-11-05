import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

export const ListClassBooking = () => {
    const [blog_list_data, set_blog_list_data] = useState([]);

    useEffect(() => {
        fetch("/api/class_bookings/booking_details")
            .then((res) => res.json())
            .then((response) => {
                if (response.status == 200) {
                    set_blog_list_data(response.class_bookings);
                }
            });
    }, []);

    return (
        <Container>
            <h1>Book Classes</h1>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
              
            }}>
            {blog_list_data.map((blog_item_data) => (
                <BlogItem blog={blog_item_data} />
            ))}
            </Box>
        </Container>
    );
};

const BlogItem = ({ blog }) => {
    return (
       
            <Root sx={{
            display: 'flex',
            flexDirection: 'column',
            
        }}>
            <Typography component="h1" sx={{
                  color: "black",
                  fontSize: "30px",
                  fontFamily: 'Bebas Neue',
            }}>{blog.class_name}</Typography>
            <span>
                When: {blog.booking_date ?? "Not specified"}
            </span>
 
            <span>
                Duration: {blog.duration_minutes}
            </span>
            <span>
                Level: {blog.level}
            </span>
            <Button variant="contained" component={Link} to={"/CreateClassBooking"} sx={{
                width: '300px',
            }}>Book Now</Button>

            <Divider sx={{mb: "20px",}}></Divider>
            </Root>
   
    );
};