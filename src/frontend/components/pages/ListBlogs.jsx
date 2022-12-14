import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

export const ListBlogs = () => {
    const [blog_list_data, set_blog_list_data] = useState([]);

    useEffect(() => {
        fetch("/api/blogs/all")
            .then((res) => res.json())
            .then((response) => {
                if (response.status == 200) {
                    set_blog_list_data(response.blogs);
                }
            });
    }, []);

    return (
        <Container>
            <h1>Blogs</h1>
              <Button variant="contained" component={Link} to={"/CreateBlogs"} sx={{
                fontSize: '13px',
                width: '200px',
                padding: '7px',
                mb: '12px',
            }}>Create Blog</Button>
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

    
    // Load classes from get_class_by_booking_id 
    const [Login, setLogin] = useState({})
    const [Trainer, setTrainer] = useState({})
    useEffect(() => {
        fetch("/api/logins/byid/" + blog.login_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    if(res.body = res.customer)
                    {
                      setLogin(res.customer)
                    } 
      
                    if(res.body = res.trainer)
                    {
                      setLogin(res.trainer)
                    }
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])

     // Load trainers bookings data
     useEffect(() => {
        fetch("/api/logins/get_trainer_by_id/" + blog.login_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setTrainer(res.trainer)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])

    return (
       
            <Root sx={{
            display: 'flex',
            flexDirection: 'column',
            
        }}>
            <Typography component="h1" sx={{
                  color: "black",
                  fontSize: "30px",
                  fontFamily: 'Bebas Neue',
            }}>{blog.blog_title ?? "Not specified"}</Typography>
            <span>
                {blog.blog_content ?? "Not specified"}
            </span>
            <span>Author: {Login.first_name ?? Trainer.first_name} {Login.last_name ?? Trainer.last_name}</span>
            
            <Divider sx={{mb: "20px",}}></Divider>
            </Root>
   
    );
};