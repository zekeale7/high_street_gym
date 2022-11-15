import { Button, Card, CardContent, CssBaseline, Grid, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom"



const theme = createTheme();

export const EditBlogs = () => {
    const navigate = useNavigate()

    // Booking id from the url bar
    const { id } = useParams()

    // Form input state
    const [blogTitle, setBlogTitle] = useState("John Doe")
    const [blogContent, setBlogContent] = useState("John Doe")
    const [blogAuthor, setBlogAuthor] = useState("John Doe")
    const [loginID, setLoginID] = useState([0])
    const [status, setStatus] = useState("");

 
    // Load the existing booking data for this record
    useEffect(() => {
        fetch("/api/blogs/byid/" + id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    const blogs = res.blogs
                    setBlogTitle(blogs.blog_title)
                    setBlogContent(blogs.blog_content)
                    setLoginID(blogs.login_id)

                } else {
                    console.log("Request error")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // Handle the saving of updated data
    const onSubmitUpdateBooking = (e) => {
        setStatus("Creating...");
        e.preventDefault()

        const blogs = {
            blog_id: id,
            blog_title: blogTitle,
            blog_content: blogContent,
            login_id: loginID

        }

        fetch("/api/blogs/update", {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogs)
        })
        .then(res => res.json())
        .then(res => {
            if (res.status == 200) {
                setStatus(res.message);
                navigate("/ListBlogs");
            } else {
                setStatus(res.message);
            }
        })
        .catch((error) => {
            setStatus("failed to fetch: " + error);
        });
    }

return( 
    <ThemeProvider theme={theme} >
        <Box sx={{backgroundColor: "lightBlue", pb: "20%" }}>
        <Container component="main" maxWidth="xs" >
        <Typography
              variant="h1"
              sx={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: 'Bebas Neue',
                  pt: '5rem'
              }} 
              >Edit Blogs</Typography>
        <CssBaseline />
        <Box component="form" onSubmit={onSubmitUpdateBooking} sx={{ pt: 3, pb: 2 }}>
            <Card>
                <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Title:" type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth  label="Content:" type="text" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Author:" type="text" value={loginID} onChange={(e) => setBlogAuthor(e.target.value)} />
                    </Grid>
                    <span>{status}</span>
                    <Grid item xs={12} sm={12}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, }}
                        >Update Blog</Button>
                    </Grid>
                </Grid>
            </CardContent>
            </Card>
        </Box>
        </Container>
        </Box>
        </ThemeProvider>
)}

