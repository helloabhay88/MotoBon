import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingHistory.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function BookingHistory() {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/bookinghistory')
            .then(response => {
                const historyDetails = response.data;
                console.log('Booking history fetched:', historyDetails); // Debug log
                setBookingHistory(historyDetails);
            })
            .catch(err => {
                console.error('Error fetching booking history:', err);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBookingHistory = bookingHistory.filter(entry => 
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.reg_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.bike_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="booking-history-container">
            <Link to="/admin"><Button variant="outline-light">Back</Button></Link>
            <h1 className="history-heading">Booking History</h1>
            <input 
                type="text"
                placeholder="Search by Name, Email, Registration Number, or Bike Name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-bar"
            />
            <ul className="history-list">
                {filteredBookingHistory.map((entry, index) => (
                    <li key={index} className="history-item">
                        <div className="history-details">
                            <p><strong>Name:</strong> {entry.name}</p>
                            <p><strong>Email:</strong> {entry.email}</p>
                            <p><strong>Phone Number:</strong> {entry.ph_no}</p>
                            <p><strong>Address:</strong> {entry.address}</p>
                            <p><strong>Registration Number:</strong> {entry.reg_no}</p>
                            <p><strong>Bike Name:</strong> {entry.bike_name}</p>
                            <p><strong>Pickup Time:</strong> {entry.pickuptime}</p>
                            <p><strong>Pickup Date:</strong> {entry.pickupdate}</p>
                            <p><strong>Dropoff Time:</strong> {entry.dropofftime}</p>
                            <p><strong>Dropoff Date:</strong> {entry.dropoffdate}</p>
                            <p><strong>Total Amount:</strong> ₹{entry.totalamount}</p>
                            <p><strong>Booked Date:</strong> {entry.booked_date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingHistory;
