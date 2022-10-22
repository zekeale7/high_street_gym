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
    const [blog_list_data, set_blog_list_data] = useState([]);

    useEffect(() => {
        fetch("/api/logins/identity")
            .then((res) => res.json())
            .then((response) => {
              
                    set_blog_list_data(response.body);
               
            });
    }, []);

    return (
        <Container>
            <h1>Blogs</h1>
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
            }}>{blog.blog_title ?? "Not specified"}</Typography>
            <span>
                {blog.blog_content ?? "Not specified"}
            </span>
            <span>{blog.blog_author ?? "Not specified"}</span>
            <Divider sx={{mb: "20px",}}></Divider>
            </Root>
   
    );
};