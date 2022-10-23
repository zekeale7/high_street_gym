import react from 'react'
import "../../style.css"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { flexbox, Stack } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ActionAreaCard} from '../ActionAreaCard';
import {ImageStack} from '../ImageStack';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import image from '/src/images/pexels-anni-roenkae-2457278.jpg'
import secondImage from '/src/images/pexels-scott-webb-3255761.jpg'
import { Link } from 'react-router-dom';

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "300px",
    "&:hover": {
        transition: "0.5s",
        border: "15px solid white",
       
        }
  }));


  
  
export const Home = () => {
    return (
    <section>
        <Box  
         sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?cs=srgb&dl=pexels-victor-freitas-791763.jpg&fm=jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '500px',
            boxShadow: 4,
            backgroundAttachment: "fixed",
            
            
          }}
        >
            <Container>
                <Typography
                variant="h1"
                sx={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: 'Bebas Neue',
                    pt: '5rem'
                }} 
                >High Street Gym</Typography>
            </Container>
            <Container>
                <Typography
                variant="subtitle1"
                sx={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: 'Bebas Neue'
                }}
                
                >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam consequatur 
                unde deleniti ipsam! Enim sunt veniam dolorum sapiente ad eos. Beatae harum nemo quae aut, 
                fugit quam porro maxime aspernatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam consequatur 
                unde deleniti ipsam! Enim sunt veniam dolorum sapiente ad eos. Beatae harum nemo quae aut, 
                fugit quam porro maxime aspernatur.</Typography>
            </Container>
            <Container sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                mt: 5
                }}>
                <Button variant="contained" href="/signup">Sign Up</Button>
            </Container>
        </Box>
        <Box sx={{ flexGrow: 1,  }}>
            <Grid container spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2} sm={4} md={4}>
                    
                    <Item sx={{
                         backgroundImage: 'url(https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?cs=srgb&dl=pexels-victor-freitas-791763.jpg&fm=jpg)',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                        
                         
                    }}>
                        <Typography variant="h2" sx={{
                            mt: "70px",
                            color: "white",
                            textAlign: "center",
                            fontFamily: 'Bebas Neue',
                           
                            
                        }}>24/7</Typography>
                        <Button variant="contained">Login</Button>
                    </Item>
                   
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <Item sx={{
                        backgroundImage: (`url(${image})`),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                          <Typography variant="h2" sx={{
                            mt: "70px",
                            color: "white",
                            textAlign: "center",
                            fontFamily: 'Bebas Neue',
                           
                            
                        }}>Fully Qualified</Typography>
                          <Button variant="contained">Login</Button>
                    </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <Item sx={{
                         backgroundImage: (`url(${secondImage})`),
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                    }}>
                          <Typography variant="h2" sx={{
                            mt: "70px",
                            color: "white",
                            textAlign: "center",
                            fontFamily: 'Bebas Neue',
                           
                            
                        }}>State of the Art</Typography>
                          <Button variant="contained" >Login</Button>
                    </Item>
                </Grid>
            </Grid>
        </Box>
        <Box>
            <Container sx={{
                display: 'inline-flex'
            }}>
                <ImageStack />
                    <Container sx={{
                        pt: '3rem',
                        
                        }}>
                        <Typography
                        variant="p"
                        sx={{
                            color: "black",
                            textAlign: "center",
                            fontFamily: 'Bebas Neue',
                   
                        }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, illum eum mollitia minus laborum voluptatem esse, 
                            molestias sapiente recusandae id nisi nam? Quas quae sapiente alias natus provident iusto facere.
                        </Typography>
                        <Typography
                        variant="p"
                        sx={{
                            color: "black",
                            textAlign: "center",
                            fontFamily: 'Bebas Neue',
                        
                        
                        }}>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, illum eum mollitia minus laborum voluptatem esse, 
                          molestias sapiente recusandae id nisi nam? Quas quae sapiente alias natus provident iusto facere.
                        </Typography>
                    </Container>
            </Container>
              
            
        </Box>
    </section>

    
    )
}