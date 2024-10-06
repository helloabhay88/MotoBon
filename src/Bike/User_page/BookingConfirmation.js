import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function BookingConfirmation() {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { totalAmount, bikeName, userName, bikeImage, userEmail, regNo, pickuptime, pickupdate, dropofftime, dropoffdate,city } = location.state || { totalAmount: 0, bikeName: '', bikeImage: '', userEmail: '', regNo: '', pickuptime: '', pickupdate: '', dropofftime: '', dropoffdate: '', userName: '',city: '' };

    const [show, setShow] = useState(false);
    const [userDetails, setUserDetails] = useState({
        ph_no: '',
        address: '',
        userName: ''
    });

    useEffect(() => {
        // Fetch user details (ph_no and address) from backend when component mounts
        axios.get(`http://localhost:8081/ph_no?email=${userEmail}`)
            .then(response => {
                setUserDetails({
                    ph_no: response.data.ph_no,
                    address: response.data.address,
                    userName: response.data.name
                });
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                // Handle error scenarios if needed
            });
    }, [userEmail]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate('/User'); // Navigate to /User page on modal close
    };

    const handlePaymentAndBooking = () => {
        // Send a POST request to your backend to process the booking
        const bookingDetails = {
            userEmail,
            regNo,
            bikeName,
            pickuptime,
            pickupdate,
            dropofftime,
            dropoffdate,
            totalAmount,
            ph_no: userDetails.ph_no,
            address: userDetails.address,
            userName
        };

        axios.post('http://localhost:8081/process-booking', bookingDetails)
            .then(response => {
                axios.post('http://localhost:8081/history', bookingDetails)
                console.log(response.data.message); // Assuming your backend sends a message upon successful insertion
                handleShow(); // Show modal on successful booking
            })
            .catch(error => {
                console.error('Error processing booking:', error);
                // Handle error scenarios if needed
            });
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            padding: '20px'
        }}>
            <h1>Booking Confirmation</h1>
            <img src={bikeImage} alt={bikeName} style={{ width: '300px', height: 'auto', marginBottom: '20px' }} />
            <h2>{bikeName}</h2>
            <h5>Total Amount to Pay: ₹{totalAmount}</h5>
            <Button variant="success" onClick={handlePaymentAndBooking}>Pay Now</Button>
            <Link to="/User" style={{ marginTop: '20px' }}>
                <Button variant="primary">Back</Button>
            </Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Status</Modal.Title>
                </Modal.Header>
                <Modal.Body><h3>Payment successful</h3></Modal.Body>
                <Modal.Body><h4>Pickup and Dropoff place: </h4>
                    <p>On Nearest Motobon Bike Rental, {city}, Kerala</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BookingConfirmation;
