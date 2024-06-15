import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Availability.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Availability() {
    const [bikes, setBikes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/bikedetails')
            .then(response => {
                const bikeDetails = response.data;
                console.log('Bike details fetched:', bikeDetails); // Debug log

                // Fetch booking details for each bike
                const bookingDetailsPromises = bikeDetails.map(bike => 
                    axios.get(`http://localhost:8081/bookingdetails/${bike.reg_no}`)
                        .then(res => ({ ...bike, bookingDetails: res.data }))
                        .catch(err => {
                            console.error(`Error fetching booking details for bike ${bike.reg_no}:`, err);
                            return bike; // Return the bike object without booking details
                        })
                );

                return Promise.all(bookingDetailsPromises);
            })
            .then(updatedBikes => {
                console.log('Updated bikes with booking details:', updatedBikes); // Debug log
                setBikes(updatedBikes);
            })
            .catch(err => {
                console.error('Error fetching bikes:', err);
            });
    }, []);

    const handleAvailabilityChange = (bikeRegNo, availability) => {
        console.log(`Changing availability for bike ${bikeRegNo} to ${availability ? 'available' : 'unavailable'}`); // Debug log
        axios.put(`http://localhost:8081/available/${bikeRegNo}`, { availability: availability ? 1 : 0 })
            .then(response => {
                const updatedBikes = bikes.map(bike => {
                    if (bike.reg_no === bikeRegNo) {
                        return { ...bike, availability: availability };
                    }
                    return bike;
                });
                setBikes(updatedBikes);
    
                // Delete booking details if bike is now available
                if (availability) {
                    console.log(`Deleting booking details for bike ${bikeRegNo}`); // Debug log
                    axios.delete(`http://localhost:8081/remove/${bikeRegNo}`)
                        .then(response => {
                            console.log(`Booking details for bike ${bikeRegNo} deleted successfully`); // Debug log
                        })
                        .catch(err => {
                            console.error(`Error deleting booking details for bike ${bikeRegNo}:`, err);
                        });
                }
            })
            .catch(err => {
                console.error('Error updating bike availability:', err);
            });
    };
    
    const fetchBookingDetails = (bikeRegNo) => {
        console.log(`Fetching booking details for bike ${bikeRegNo}`); // Debug log
        axios.get(`http://localhost:8081/bookingdetails/${bikeRegNo}`)
            .then(response => {
                const bookingDetails = response.data;
                console.log("Hello user");
                console.log('Booking Details Fetched:', bookingDetails); // Debug log

                const updatedBikes = bikes.map(bike => {
                    if (bike.reg_no === bikeRegNo) {
                        return { ...bike, bookingDetails: bookingDetails };
                    }
                    return bike;
                });
                console.log('Updated Bikes:', updatedBikes); // Debug log
                setBikes(updatedBikes);
            })
            .catch(err => {
                console.error('Error fetching booking details:', err);
            });
    };

    useEffect(() => {
        console.log('Bikes state updated:', bikes); // Debug log
    }, [bikes]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBikes = bikes.filter(bike => 
        bike.bike_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.reg_no.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="availability-container">
            <div className="bike-details-container">
                <Link to="/admin"><Button variant="outline-light">Back</Button></Link>
                <h1 className="availability-heading">Admin Page</h1>
                <input 
                    type="text"
                    placeholder="Search by Bike Name or Registration Number"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                <ul className="bikes-list">
                    {filteredBikes.map(bike => (
                        <li key={bike.reg_no} className="bike-item">
                            <div className="bike-details">
                                <h2 className="bike-name">{bike.bike_name}</h2>
                                <h2>{bike.reg_no}</h2>
                                <p className="availability-status">
                                    Available: {bike.availability ? 'Yes' : 'No'}
                                </p>
                                {bike.bookingDetails ? (
                                    <div className="booking-details">
                                        <p><strong>Email:</strong> {bike.bookingDetails.email}</p>
                                        <p><strong>Name:</strong> {bike.bookingDetails.name}</p>
                                        <p><strong>Phone Number:</strong> {bike.bookingDetails.ph_no}</p>
                                        <p><strong>Address:</strong> {bike.bookingDetails.address}</p>
                                        <p><strong>Pickup Time:</strong> {bike.bookingDetails.pickuptime}</p>
                                        <p><strong>Pickup Date:</strong> {bike.bookingDetails.pickupdate}</p>
                                        <p><strong>Dropoff Time:</strong> {bike.bookingDetails.dropofftime}</p>
                                        <p><strong>Dropoff Date:</strong> {bike.bookingDetails.dropoffdate}</p>
                                        <p><strong>Total Amount:</strong> ₹{bike.bookingDetails.totalamount}</p>
                                    </div>
                                ) : (
                                    <div>No booking details available</div>
                                )}
                            </div>
                            <button
                                className={`availability-button ${bike.availability ? 'available' : 'unavailable'}`}
                                onClick={() => handleAvailabilityChange(bike.reg_no, !bike.availability)}
                            >
                                {bike.availability ? 'Set Unavailable' : 'Set Available'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Availability;
