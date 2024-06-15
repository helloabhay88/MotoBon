import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function User() {
    const [bikes, setBikes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBike, setSelectedBike] = useState(null);
    const [showBookingOptions, setShowBookingOptions] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [userName, setUserName] = useState('');
    const [bookingHistory, setBookingHistory] = useState([]);
    const [showHistoryPopup, setShowHistoryPopup] = useState(false);
    const historyModalRef = useRef();
    const modalRef = useRef();
    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    const [userApproved, setUserApproved] = useState(false); // State to check if user is approved
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        fetchUserDetails();
        fetchBikes();
        fetchBookingHistory();
        checkUserApproval();
    }, []);

    const fetchUserDetails = () => {
        const email = localStorage.getItem('userEmail');
        axios.post('http://localhost:8081/get_user_details', { email })
            .then(response => {
                if (response.data.success) {
                    setUserName(response.data.name);
                } else {
                    console.error('Error fetching user details:', response.data.message);
                }
            })
            .catch(err => {
                console.error('Error fetching user details:', err);
            });
    };
    const checkUserApproval = () => {
        const userEmail = localStorage.getItem('userEmail'); // Assuming user email is stored in localStorage
        axios.post('http://localhost:8081/check_user_approval', { email: userEmail })
            .then(response => {
                setUserApproved(response.data.approved); // Update user approval state
            })
            .catch(err => {
                console.error('Error checking user approval:', err);
            });
    };
    const fetchBikes = () => {
        axios.get('http://localhost:8081/bikedetails')
            .then(response => {
                setBikes(response.data);
            })
            .catch(err => {
                console.error('Error fetching bikes:', err);
            });
    };

    const fetchBookingHistory = () => {
        const email = localStorage.getItem('userEmail');
        axios.post('http://localhost:8081/get_booking_history', { email })
            .then(response => {
                if (response.data.success) {
                    setBookingHistory(response.data.history);
                    console.log(response.data.history)
                } else {
                    console.error('Error fetching booking history:', response.data.message);
                }
            })
            .catch(err => {
                console.error('Error fetching booking history:', err);
            });
    };

    function handleLogout() {
        localStorage.removeItem('isUserLoggedIn');
        localStorage.removeItem('userEmail');
        navigate('/Userlogin');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowBookingOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBookNow = (bike) => {
        if (!userApproved) {
            alert('You need to be approved by the admin to rent a bike.');
            return;
        }
        console.log("fail")
        setSelectedBike(bike);
        setShowBookingOptions(true);
    };

    const handleBookingConfirmation = () => {
        const bookingDetails = {
            bikeRegNo: selectedBike.reg_no,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            userName
        };

        axios.post('http://localhost:8081/bookings', bookingDetails)
            .then(response => {
                console.log(response.data.message);

                let totalAmount;
                const pickup = new Date(pickupDate);
                const dropoff = new Date(dropoffDate);
                const diffTime = Math.abs(dropoff - pickup);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 0) {
                    totalAmount = selectedBike.price;
                } else {
                    totalAmount = diffDays * selectedBike.price;
                }

                navigate('/booking-confirmation', {
                    state: { 
                        totalAmount,
                        bikeName: selectedBike.bike_name,
                        bikeImage: `http://localhost:8081/bike_photo_path/${selectedBike.reg_no}.jpg`,
                        userEmail: localStorage.getItem('userEmail'),
                        regNo: selectedBike.reg_no,
                        pickuptime: pickupTime,
                        pickupdate: pickupDate,
                        dropofftime: dropoffTime,
                        dropoffdate: dropoffDate,
                        userName: userName
                    }
                });

                setSelectedBike(null);
                setShowBookingOptions(false);
                setPickupDate('');
                setDropoffDate('');
                setPickupTime('');
                setDropoffTime('');
            })
            .catch(err => {
                console.error('Error confirming booking:', err);
            });
    };

    const filteredBikes = bikes.filter(bike =>
        bike.bike_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const toggleHistoryPopup = () => {
        setShowHistoryPopup(!showHistoryPopup);
    };
    return (
        <div style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1486673748761-a8d18475c757?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div className="position-absolute top-0 start-0 p-3">
                <Link to="/">
                    <Button variant="info">Back</Button>
                </Link>
            </div>
            <div className="position-absolute top-0 end-0 p-3">
            <Button onClick={toggleHistoryPopup} variant="success" className="mb-3 me-2">Rented History</Button>
           
                <Link to="/">
                    <Button onClick={handleLogout} variant="outline-warning" className="mb-3">Logout</Button>
                </Link>
            </div>

            <h1 style={{ width: '100%', textAlign: 'center', color: 'white' }}>Welcome, {userName}</h1>

            <Form.Group controlId="searchBar" style={{ marginBottom: '20px', width: '100%', maxWidth: '300px', marginLeft: '20px' }}>
                <Form.Control
                    type="text"
                    placeholder="Search for bikes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
                justifyContent: 'center',
            }}>
                {filteredBikes.map((bike) => {
                    const imageUrl = `http://localhost:8081/bike_photo_path/${bike.reg_no}.jpg`;

                    return (
                        <Card key={bike.reg_no}>
                            <Card.Img
                                variant="top"
                                src={imageUrl}
                                alt={bike.reg_no}
                                style={{ height: '240px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <h4>{bike.bike_name}</h4>
                                
                                <h6>{bike.bike_condition}</h6>
                                <Card.Title>Per Day: ₹{bike.price}</Card.Title>
                                {!bike.availability ? (
                                    <>
                                    <div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
                                        Not Available
                                        
                                    </div>
                                    <div>
                                        <p>Bike Available in {bike.dropoffDate}</p>
                                    </div>
                                    </>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="primary" onClick={() => handleBookNow(bike)}>Book now</Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
            <Modal show={showHistoryPopup} onHide={() => setShowHistoryPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Rented History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bookingHistory.length > 0 ? (
                        <ol>
                            {bookingHistory.map((booking, index) => (
                                <li key={index}>
                                    <p><strong>Bike Name: </strong> {booking.bike_name}</p>
                                    <p><strong>Pickup Date: </strong> {booking.pickupdate}</p>
                                    <p><strong>Dropoff Date: </strong> {booking.dropoffdate}</p>
                                    <p><strong>Total Amount: </strong> ₹{booking.totalamount}</p>
                                    <p><strong>Booked Date: </strong>{booking.booked_date}</p>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p>No rental history found.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowHistoryPopup(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
            {showBookingOptions && selectedBike && (
                <div ref={modalRef} style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '30px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    textAlign: 'center',
                    color: 'black',
                    maxWidth: '400px',
                    zIndex: '9999',
                }}>
                    <h2 style={{ marginBottom: '20px' }}>Booking Options</h2>
                    <p style={{ marginBottom: '15px' }}>Selected Bike: {selectedBike.bike_name}</p>
                    <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={{ marginRight: '10px' }}>Pickup:</label>
                        <input
                            type="date"
                            value={pickupDate}
                            min={today}
                            onChange={(e) => setPickupDate(e.target.value)}
                            style={{
                                padding: '5px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginRight: '10px',
                            }}
                        />
                        <input
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            style={{
                                padding: '5px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={{ marginRight: '10px' }}>Dropoff:</label>
                        <input
                            type="date"
                            value={dropoffDate}
                            min={today}
                            onChange={(e) => setDropoffDate(e.target.value)}
                            style={{
                                padding: '5px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginRight: '10px',
                            }}
                        />
                        <input
                            type="time"
                            value={dropoffTime}
                            onChange={(e) => setDropoffTime(e.target.value)}
                            style={{
                                padding: '5px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <Button variant="success" onClick={handleBookingConfirmation}>Confirm Booking</Button>
                </div>
            )}

            {/* <div style={{ marginTop: '40px', width: '100%', maxWidth: '800px', color: 'white' }}>
                <h2>Booking History</h2>
                {bookingHistory.length > 0 ? (
                    bookingHistory.map((history, index) => (
                        <Card key={index} style={{ marginBottom: '20px' }}>
                            <Card.Body>
                                <h4>{history.bike_name}</h4>
                                <p><strong>Registration Number:</strong> {history.reg_no}</p>
                                <p><strong>Pickup Date:</strong> {history.pickupdate}</p>
                                <p><strong>Pickup Time:</strong> {history.pickuptime}</p>
                                <p><strong>Dropoff Date:</strong> {history.dropoffdate}</p>
                                <p><strong>Dropoff Time:</strong> {history.dropofftime}</p>
                                <p><strong>Total Amount:</strong> ₹{history.totalamount}</p>
                                <p><strong>Booked Date:</strong> {history.booked_date}</p>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No booking history available.</p>
                )}
            </div> */}
        </div>
    );
}

export default User;
