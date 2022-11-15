import {Routes, Route} from "react-router-dom"
import {Home} from "./pages/Home"
import {CruiseList} from "./pages/CruiseList"
import {Login} from "./pages/Login"
import {NavBar} from "./NavBar"
import {SignUp} from "./pages/Signup"
import {ListClasses} from "./pages/ListClasses"
import {Footer} from "./Footer"
import {createTheme, ThemeProvider} from '@mui/material'
import { CssBaseline } from "@mui/material"
import "../style.css"
import { EditClasses } from "./pages/EditClasses"
import { EditBlogs } from "./pages/EditBlogs"
import { EditCustomers } from "./pages/EditCustomers"
import { EditTrainers } from "./pages/EditTrainers"
import { EditClassBookings } from "./pages/EditClassBookings"
import { ListCustomers } from "./pages/ListCustomers"
import { ListClassBookingAdmin } from "./pages/ListClassBookingAdmin"
import { AboutUs } from "./pages/AboutUs"
import { Account } from "./pages/Account"
import { CreateClasses } from "./pages/CreateClasses"
import { CreateBlogs } from "./pages/CreateBlogs"
import useLogin from "./../hooks/login_hooks";
import { ListTrainers } from "./pages/ListTrainers"
import { DeleteCustomer } from "./pages/DeleteCustomer"
import { DeleteTrainer } from "./pages/DeleteTrainer"
import { DeleteBlogs } from "./pages/DeleteBlogs"
import { CreateTrainer} from "./pages/CreateTrainer"
import { ListBlogs} from "./pages/ListBlogs"
import { CreateClassBooking} from "./pages/CreateClassBooking"
import { DeleteClassBooking } from "./pages/DeleteClassBooking"
import { DeleteClasses } from "./pages/DeleteClasses"
import { CreateAdmin } from "./pages/CreateAdmin"
import { ListAdmins } from "./pages/ListAdmins"
import { EditAdmins } from "./pages/EditAdmins"
import { DeleteAdmins } from "./pages/DeleteAdmins"
import { ListClassBookingMember } from "./pages/ListClassBookingMember"
import { ListBookedClasses } from "./pages/ListBookedClasses"
import { CreateClassBookingMember } from "./pages/CreateClassBookingMember"



const theme = createTheme({
    palette: {
        background:{
            default: "white"
        }
    }
});


export const App = () => {
        const { login, logout, loggedIn, customer, trainer, admin } = useLogin();

        return <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <header>
                <NavBar 
                 logout={logout}
                 loggedIn={loggedIn}
                 customer={customer}
                 trainer={trainer}
                 admin={admin}
                />
            </header>
          
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CruiseList" element={<CruiseList />}/>
                <Route path="/Signup" element={<SignUp />} />
                <Route path="/ListClasses" element={<ListClasses />}/>
                <Route path="/ListBookedClasses" element={<ListBookedClasses />}/>
                <Route path="/ListClassBookingAdmin" element={<ListClassBookingAdmin />}/>
                <Route path="/ListClassBookingMember" element={<ListClassBookingMember />}/>
                <Route path="/CreateAdmin" element={<CreateAdmin />}/>
                <Route path="/CreateTrainer" element={<CreateTrainer />}/>
                <Route path="/CreateBlogs" element={<CreateBlogs />}/>
                <Route path="/CreateClassBooking" element={<CreateClassBooking />}/>
                <Route path="/CreateClassBookingMember/:id" element={<CreateClassBookingMember />}/>
                <Route path="/AboutUs" element={<AboutUs />}/>
                <Route path="/Account" element={<Account />}/>
                <Route path="/CreateClasses" element={<CreateClasses />}/>
                <Route path="/EditClasses/:id" element={<EditClasses />}/>
                <Route path="/EditClassBookings/:id" element={<EditClassBookings />}/>
                <Route path="/EditCustomers/:id" element={<EditCustomers />}/>
                <Route path="/EditAdmins/:id" element={<EditAdmins />}/>
                <Route path="/EditTrainers/:id" element={<EditTrainers />} />
                <Route path="/EditBlogs/:id" element={<EditBlogs />} />
                <Route path="/ListCustomers" element={<ListCustomers />}/>
                <Route path="/ListAdmins" element={<ListAdmins />}/>
                <Route path="/ListTrainers" element={<ListTrainers />}/>
                <Route path="/ListBlogs" element={<ListBlogs />}/>
                <Route path="/DeleteClassBooking/:id" element={<DeleteClassBooking />}/>
                <Route path="/DeleteCustomer/:id" element={<DeleteCustomer />}/>
                <Route path="/DeleteAdmins/:id" element={<DeleteAdmins />}/>
                <Route path="/DeleteTrainer/:id" element={<DeleteTrainer />}/>
                <Route path="/DeleteBlogs/:id" element={<DeleteBlogs />}/>
                <Route path="/DeleteClasses/:id" element={<DeleteClasses />}/>
                <Route path="/Login" element={<Login login={login} />}/>
              
            </Routes>
            <Footer />
          </ThemeProvider>
        </>
       
};
