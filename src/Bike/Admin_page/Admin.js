import React from 'react';
import { Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';

function Admin() {
    const backgroundImageUrl = 'https://wallpapercave.com/wp/wp3647908.jpg';
    const navigate = useNavigate();
    // Styles for the background and container
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const containerStyle = {
        padding: '60px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // White background with alpha 0.3 for transparency
        border: '1px solid rgba(0, 0, 0, 0.8)', // Border with slight transparency
        color: '#fff', // Set text color to white for the entire container
        width: '30%', // Adjust the width as per your design
        textAlign: 'center',
    };

    // Style for the buttons to make the text white
    const buttonStyle = {
        color: '#fff', // Set text color to white
    };
    function handleLogout() {
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/Adminlogin');
    }
    return (
        <div style={backgroundStyle}>
            <div style={containerStyle}>
                <Link to="/"><Button style={buttonStyle} variant="secondary">Back</Button>{' '}</Link>
                <div className="position-absolute top-0 end-0 p-3">
                    <Link to="/"><Button style={buttonStyle} onClick={handleLogout}  variant="secondary" >Logout</Button>{' '}</Link>
                </div>
                <h1 style={{ color: '#fff' }}>Welcome Back</h1>
                <Link to="/Form_insert">
                    <Button style={buttonStyle} className="m-3" variant="outline-info">Add Bike</Button><br/>
                </Link>
                <Link to="/Form_search">
                    <Button style={buttonStyle} className="m-3" variant="outline-info">View Bike</Button>
                </Link>
                <Link to="/Form_modify">
                    <Button style={buttonStyle} className="m-3" variant="outline-info">Update Bike</Button>
                </Link>
                <br/>
                <Link to="/delete-bike">
                    <Button style={buttonStyle} className="m-3" variant="outline-info">Delete Bike</Button>
                </Link>
                <Link to="/available">
                    <Button style={buttonStyle} className="m-3" variant="outline-info">Bike Availability</Button>
                </Link>
                <Link to="/approval">
                    <Button style={buttonStyle} className="m-3" variant="outline-info">Approval</Button>
                </Link>
                <Link to="/Booking-History">
                    <Button style={buttonStyle} className="m-3" variant="outline-info">Booking History</Button>
                </Link>
                <Link to="/Complaints">
                    <Button style={buttonStyle} className="m-3" variant="outline-info">Complaints or Suggestions</Button>
                </Link>
               
            </div>
        </div>
    );
}

export default Admin;
