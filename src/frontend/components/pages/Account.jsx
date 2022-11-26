import { Button,Divider,Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';

export const Account = () => {
    // Fetch session data by login id
      // Load the login details for this booking item
      const [Bookings, setBookings] = useState([]);
      const [blogData, setBlogData] = useState([]);
 
 

      // Load the login details for this booking item
      const [identity_data, set_identity_data] = useState([]);

      useEffect(() => {
        fetch("/api/logins/identity")
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
    
                  if(res.body = res.customer)
                  {
                    set_identity_data(res.customer)
                  } 
                  
                  if(res.body = res.trainer)
                  {
                    set_identity_data(res.trainer)
                  } 
                  if(res.body = res.admin)
                  {
                    set_identity_data(res.admin)
                  } 
                  
                           
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [])



    useEffect(() => {
        fetch("/api/class_bookings_members/get_booking_by_customer/" + identity_data.customer_id )
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setBookings(res.booking)       
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [identity_data])

    useEffect(() => {
        fetch("/api/blogs/get_blogs_by_login/" + identity_data.login_id )
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setBlogData(res.blogs)       
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [identity_data])


     
    
return (
    <Container>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Bebas Neue',
          
        }}>
           <Typography
                variant="h1"
                sx={{
                    color: "black",
                    textAlign: "center",
                    fontFamily: 'Bebas Neue',
                    pt: '5rem'
                }} 
                >Welcome, {identity_data.first_name} {identity_data.last_name}!</Typography>
                <Container>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Typography
                variant="h4"
                sx={{
                    color: "black",
                    fontFamily: 'Bebas Neue',
                    pt: '5rem'
                }} 
                >Member Details</Typography>
                <Divider variant="middle" sx={{mb: "20px",}} />
                <span>Full Name: {identity_data.first_name} {identity_data.last_name}</span>
                <span>Phone: {identity_data.phone}</span>
                <span>Email: {identity_data.email}</span>
                <span>Address: {identity_data.street} {identity_data.city} {identity_data.state} {identity_data.country}</span>
                    
                    </Box>
                </Container>
                
                <Container>
                    <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                
                    }}>
                    <Typography
                        variant="h4"
                        sx={{
                        color: "black",
                        fontFamily: 'Bebas Neue',
                        pt: '5rem'
                }} 
                >Your Current Bookings</Typography>
                    <Divider sx={{mb: "20px",}}></Divider>
                    {Bookings.map((blog_item_data) => (
                        <BlogItem blog={blog_item_data} />
            ))}
                    </Box>
                 
                </Container>
                
    </Box>
            <Container>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    
                        }}>
                   <Typography
                        variant="h4"
                        sx={{
                        color: "black",
                        fontFamily: 'Bebas Neue',
                        pt: '5rem'
                }} 
                >Your Blogs</Typography>
                <Divider sx={{mb: "20px",}}></Divider>
                {blogData.map((blog_item) => (
                    <BlogDataItem blog_data={blog_item} />
                ))}
                </Box>
                <Divider></Divider>
            </Container>
            
    </Container>

)}

const BlogItem = ({ blog }) => {
    const [classBooking, setClassBooking] = useState({})
    const [classes, setClasses] = useState([])
    const [trainers, setTrainers] = useState([])


    useEffect(() => {
        fetch("/api/class_bookings/byid/" + blog.class_booking_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClassBooking(res.booking)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [blog])

    useEffect(() => {
        fetch("/api/classes/byid/" + classBooking.class_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setClasses(res.classes)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [classBooking])

    useEffect(() => {
        fetch("/api/trainers/byid/" + classBooking.trainer_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setTrainers(res.trainer)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [classBooking])

    return (
       
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        
            }}>
                <span>Full Name: {blog.first_name} {blog.last_name}</span>
                <span>Booking Date: {classBooking.booking_date}</span>
                <span>Class Name: {classes.class_name}</span>
                <span>Level: {classes.level}</span>
                <span>Duration: {classes.duration_minutes}</span>
                <span>Trainer: {trainers.first_name} {trainers.last_name}</span>
        <Button variant="contained" sx={{mr: "15px", width: "200px", mb: "15px", mt: "10px"}}  component={Link} to={"/DeleteBookedClasses/" + blog.class_bookings_members_id}>Cancel Booking</Button>
        <Divider sx={{mb: "5px",}}></Divider>
            </Box>
   
    );
};

const BlogDataItem = ({ blog_data }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("/api/blogs/byid/" + blog_data.blog_id)
            .then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setBlogs(res.blogs)
                } else {
                    console.log("Error loading activity for booking item")
                }
            })
    }, [blog_data])

    return (
       
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        
            }}>
              <Typography component="h1" sx={{
                  color: "black",
                  fontSize: "30px",
                  fontFamily: 'Bebas Neue',
            }}>{blogs.blog_title ?? "Not specified"}</Typography>
            <span>
                {blogs.blog_content ?? "Not specified"}
            </span>


            <Button variant="contained" sx={{mb: "10px", mr: "15px", width: '200px',}}  component={Link} to={"/EditBlogs/" + blogs.blog_id}>Edit</Button>
            <Button variant="contained" sx={{mb: "15px", mr: "15px", width: '200px',}}  component={Link} to={"/DeleteBlogs/" + blogs.blog_id}>Delete</Button>
        
            <Divider sx={{mb: "20px",}}></Divider>
            </Box>
   
    );
};


     
    








