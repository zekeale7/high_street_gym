import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import "../style.css"



const pages = [
  {name: 'Home', path: "/"},
  {name: 'Login', path: "/Login"},
  {name: 'Sign Up', path: "/Signup"},
  {name: 'About Us', path: "/AboutUs"},
  {name: 'Book Classes', path: "/ClassPage"},
  {name: 'Account', path: "/Account"},
  {name: 'Customers', path: "/ListCustomers"},
  {name: 'Trainers', path: "/ListTrainers"},
  {name: 'Classes', path: "/ListClasses"},
  {name: 'Logout', path: "/Logout"},
];




// User (signed out) pages
// Home, Login, Sign Up, Book Classes, About us, 
//
// User (signed in) pages
// Home, About us, Book Classes, Account, Logout
// 
// Admin pages
// Home, Members, Trainers, Classes, Logout


export const NavBar = ({logout, loggedIn, customer, trainer}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: 'lightgrey',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Bebas Neue',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            High Street Gym
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', },
              }}
            >

  
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={`${page.path}`}>{page.name}</Link>
                  </Typography>
                </MenuItem>
              ))} */}

            {customer ? (
              <>
               <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/"}>Home</Link>
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/Account"}>Account</Link>
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/ClassPage"}>Book Classes</Link>
                  </Typography>
                </MenuItem>
                </>
                 ) : (
                  <></>
              )}
                {trainer ? (
                <>
                 <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/Home"}>Home</Link>
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/Account"}>Account</Link>
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/AboutUs"}>About Us</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to="/ListCustomers">Customers</Link>
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to="/ListTrainers">Trainers</Link>
                  </Typography>
                </MenuItem>
                  
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to="/ListClasses">Classes</Link>
                  </Typography>
                </MenuItem>
                
                   </>
                   ) : (
                       <></>
                   )}

                {loggedIn ? (

                  <MenuItem onClick={() =>{
                    logout();
                  }}>
                      <Typography textAlign="center">
                      <Link style={{textDecoration: "none", color: "black"}} to="/Logout">Logout</Link>
                      </Typography>
                  </MenuItem>
                    ) : (
                        <>
                <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                    <Link style={{textDecoration: "none", color: "black"}} to={"/"}>Home</Link>
                    </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/Account"}>Account</Link>
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/ClassPage"}>Book Classes</Link>
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color: "black"}} to={"/ListBlogs"}>Blogs</Link>
                  </Typography>
                </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                      <Link style={{textDecoration: "none", color: "black"}} to="/Signup">Signup</Link>
                      </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                      <Link style={{textDecoration: "none", color: "black"}} to="/Login">Login</Link>
                      </Typography>
                  </MenuItem>
                  </>
                    )}

            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: 6,
              color: 'black',
              textDecoration: 'none',
            }}
          >
            High Street Gym
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                 <Link style={{textDecoration: "none", color: "black"}} to={`${page.path}`}>{page.name}</Link>
              </Button>
            ))} */}
            {/* Second if statements
          */}
              {customer ? (
              <>
                <Button  onClick={handleCloseNavMenu}>
                  <Link style={{textDecoration: "none", color: "black"}} to={"/Home"}>Home</Link>              
                </Button>
               <Button  onClick={handleCloseNavMenu}>
                  <Link style={{textDecoration: "none", color: "black"}} to={"/Account"}>Account</Link>
                </Button>
                <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/ListBlogs">Blogs</Link>   
                  </Button>
                  <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/ClassPage">Book Class</Link>   
                  </Button>  
                </>
                 ) : (
                  <></>
              )}
                {trainer ? (
                        <>
                 <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/Home">Home</Link>   
                  </Button>
                   <Button  onClick={handleCloseNavMenu}>
                  <Link style={{textDecoration: "none", color: "black"}} to={"/Account"}>Account</Link>
                </Button>
                  <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/AboutUs">About</Link>   
                  </Button>
                <Button onClick={handleCloseNavMenu}> 
                  <Link style={{textDecoration: "none", color: "black"}} to="/ListCustomers">Customers</Link>    
                </Button>
                <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/ListBlogs">Blogs</Link>   
                  </Button>
                <Button onClick={handleCloseNavMenu}>              
                  <Link style={{textDecoration: "none", color: "black"}} to="/ListTrainers">Trainers</Link>
                </Button>
                  
                <Button onClick={handleCloseNavMenu}>           
                  <Link style={{textDecoration: "none", color: "black"}} to="/ListClasses">Classes</Link>     
                </Button>
                
                   </>
                   ) : (
                       <></>
                   )}

                {loggedIn ? (

                  <Button onClick={() =>{
                    logout();
                  }}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/Logout">Logout</Link>    
                  </Button>
                    ) : (
                        <>
                  <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/Home">Home</Link>   
                  </Button>
                  <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/AboutUs">About</Link>   
                  </Button>
                  <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/ClassPage">Book Class</Link>   
                  </Button>  
                  <Button onClick={handleCloseNavMenu}>
                      <Link style={{textDecoration: "none", color: "black"}} to="/Signup">Signup</Link>   
                  </Button>
                  <Button onClick={handleCloseNavMenu}>  
                      <Link style={{textDecoration: "none", color: "black"}} to="/Login">Login</Link>
                  </Button>
                  </>
                    )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

