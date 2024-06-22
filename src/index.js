import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Bike/Main';
import Test from './Test/Test';
import { Container } from 'react-bootstrap';
import Miini from './Miini';
import Form from './server/frontend/Form_insert';
import Form_search from './server/frontend/Form_search';
import Form_modify from './server/frontend/Form_modify';
import Userlogin from './Bike/Userlogin';
import Adminlogin from './Bike/Adminlogin';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Signin from './Bike/Signin';
import Contactus from './Bike/Contactus';
import Admin from './Bike/Admin_page/Admin';
import Formm from './server/frontend/Form_insert';
import User from './Bike/User_page/User';
import aboutus from './Bike/Aboutus';
import Terms from './Bike/Terms';
import Complaints from './Bike/Complaints';
import Book from './Bike/User_page/Book';
import Availability from './Bike/Availability';
import BookingConfirmation from './Bike/User_page/BookingConfirmation';
import DeleteBike from './Bike/DeleteBike';
import BookingHistory from './Bike/BookingHistory';
import Approval from './Bike/Admin_page/Approval';
import { pdfjs } from 'react-pdf';
import { Navigate } from 'react-router-dom';
import AboutUs from './Bike/Aboutus';

const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
const PrivateRouteAdmin = ({ component: Component }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAdminLoggedIn ? <Component /> : <Navigate to="/Adminlogin" replace />;
};

// Protected Route component for user
const PrivateRouteUser = ({ component: Component }) => {
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
  return isUserLoggedIn ? <Component /> : <Navigate to="/Userlogin" replace />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Userlogin" element={<Userlogin />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Contact_us" element={<Contactus />} />
        <Route path="/About_us" element={<AboutUs />} />
        <Route path="/Terms" element={<Terms />} />

        {/* Public Route */}
        <Route path="/User" element={<PrivateRouteUser component={User} />} />

        {/* Protected Routes */}
        <Route path="/Admin" element={<PrivateRouteAdmin component={Admin} />} />
        <Route path="/Form_insert" element={<PrivateRouteAdmin component={Formm} />} />
        <Route path="/Form_modify" element={<PrivateRouteAdmin component={Form_modify} />} />
        <Route path="/Form_search" element={<PrivateRouteAdmin component={Form_search} />} />
        <Route path="/Complaints" element={<PrivateRouteAdmin component={Complaints} />} />
        <Route path="/book" element={<PrivateRouteAdmin component={Book} />} />
        <Route path="/available" element={<PrivateRouteAdmin component={Availability} />} />
        <Route path="/booking-confirmation" element={<PrivateRouteAdmin component={BookingConfirmation} />} />
        <Route path="/delete-bike" element={<PrivateRouteAdmin component={DeleteBike} />} />
        <Route path="/Booking-History" element={<PrivateRouteAdmin component={BookingHistory} />} />
        <Route path="/approval" element={<PrivateRouteAdmin component={Approval} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();