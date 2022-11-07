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
             <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/EditBlogs/" + blog.blog_id}>Edit</Button>
        <Button variant="contained" sx={{mr: "15px"}}  component={Link} to={"/DeleteBlogs/" + blog.blog_id}>Delete</Button>
            <Divider sx={{mb: "20px",}}></Divider>
            </Root>
   
    );
};