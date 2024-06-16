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

// Set the workerSrc to a CDN URL
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   {/* <Userlogin/>
   <Adminlogin/> */}
   <Router>
      <Routes>
      <Route path="/" Component={Main}/>
      <Route path="/Userlogin" Component={Userlogin}/>
      <Route path="/Adminlogin" Component={Adminlogin}/>
      <Route path="/Admin" Component={Admin}/>
      <Route path="/User" Component={User}/>
      <Route path="/signin" Component={Signin}/>
      <Route path="/Form_insert" Component={Formm}/>
      <Route path="/Form_modify" Component={Form_modify}/>
      <Route path="/Form_search" Component={Form_search}/>
      <Route path="/Contact_us" Component={Contactus}/>
      <Route path="/About_us" Component={aboutus}/>
      <Route path="/Terms" Component={Terms}/>
      <Route path="/Complaints" Component={Complaints}/>
      <Route path="/book" Component={Book}/>
      <Route path="/available" Component={Availability}/>
      <Route path="/booking-confirmation" Component={BookingConfirmation}/>
      <Route path="/delete-bike" Component={DeleteBike}/>
      <Route path="/Booking-History" Component={BookingHistory}/>
      <Route path="/approval" Component={Approval}/>
      </Routes>
   </Router>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
