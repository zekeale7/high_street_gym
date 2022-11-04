import {Routes, Route} from "react-router-dom"
import {Home} from "./pages/Home"
import {CruiseList} from "./pages/CruiseList"
import {Login} from "./pages/Login"
import {NavBar} from "./NavBar"
import {BasicSelect} from "./SelectComponenet"
import {SignUp} from "./pages/Signup"
import {ListClasses} from "./pages/ListClasses"
import {Footer} from "./Footer"
import {createTheme, ThemeProvider} from '@mui/material'
import { CssBaseline } from "@mui/material"
import "../style.css"
import { EditClasses } from "./pages/EditClasses"
import { EditCustomers } from "./pages/EditCustomers"
import { ListCustomers } from "./pages/ListCustomers"
import { ListClassBooking } from "./pages/ListClassBooking"
import { AboutUs } from "./pages/AboutUs"
import { Account } from "./pages/Account"
import { CreateClasses } from "./pages/CreateClasses"
import { CreateUsers } from "./pages/CreateUsers"
import { CreateBlogs } from "./pages/CreateBlogs"
import {ClassPage} from "./pages/ClassPage"
import useLogin from "./../hooks/login_hooks";
import { ListTrainers } from "./pages/ListTrainers"
import { DeleteCustomer } from "./pages/DeleteCustomer"
import { CreateTrainer} from "./pages/CreateTrainer"
import { ListBlogs} from "./pages/ListBlogs"
import { CreateClassBooking} from "./pages/CreateClassBooking"
import { BlogsDemo} from "./pages/BlogsDemo"
import { CreateBookingFormDemo} from "./pages/CreateBookingFormDemo"
import { EditBookingFormDemo} from "./pages/EditBookingFormDemo"
import { DeleteBookingDemo} from "./pages/DeleteBookingDemo"

const theme = createTheme({
    palette: {
        background:{
            default: "white"
        }
    }
});


export const App = () => {
        const { login, logout, loggedIn, customer, trainer } = useLogin();

        return <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <header>
                <NavBar 
                 logout={logout}
                 loggedIn={loggedIn}
                 customer={customer}
                 trainer={trainer}
                />
            </header>
          
            <Routes>
                <Route path="/DeleteBookingDemo/:id" element={<DeleteBookingDemo />} />
                <Route path="/EditBookingFormDemo/:id" element={<EditBookingFormDemo />} />
                <Route path="/CreateBookingFormDemo" element={<CreateBookingFormDemo />} />
                <Route path="/" element={<Home />} />
                <Route path="/BlogsDemo" element={<BlogsDemo />} />
                <Route path="/CruiseList" element={<CruiseList />}/>
                <Route path="/Signup" element={<SignUp />} />
                <Route path="/ListClasses" element={<ListClasses />}/>
                <Route path="/ClassPage" element={<ClassPage />}/>
                <Route path="/ListClassBooking" element={<ListClassBooking />}/>
                <Route path="/CreateTrainer" element={<CreateTrainer />}/>
                <Route path="/CreateBlogs" element={<CreateBlogs />}/>
                <Route path="/CreateClassBooking" element={<CreateClassBooking />}/>
                <Route path="/AboutUs" element={<AboutUs />}/>
                <Route path="/Account" element={<Account />}/>
                <Route path="/CreateClasses" element={<CreateClasses />}/>
                <Route path="/CreateUsers" element={<CreateUsers />}/>
                <Route path="/EditClasses" element={<EditClasses />}/>
                <Route path="/EditCustomers" element={<EditCustomers />}/>
                <Route path="/ListCustomers" element={<ListCustomers />}/>
                <Route path="/ListTrainers" element={<ListTrainers />}/>
                <Route path="/ListBlogs" element={<ListBlogs />}/>
                <Route path="/DeleteCustomer" element={<DeleteCustomer />}/>
                <Route path="/Login" element={<Login login={login} />}/>
              
            </Routes>
            <Footer />
          </ThemeProvider>
        </>
       
};
