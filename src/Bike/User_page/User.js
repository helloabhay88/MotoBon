import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Dropdown } from 'react-bootstrap';
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
    const [city, setCity] = useState('');
    const [bookingHistory, setBookingHistory] = useState([]);
    const [showHistoryPopup, setShowHistoryPopup] = useState(false);
    const historyModalRef = useRef();
    const modalRef = useRef();
    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    const [userApproved, setUserApproved] = useState(false); // State to check if user is approved
    const [errorMessage, setErrorMessage] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');

    const [file, setFile] = useState(null);
    const [rejected, setRejected] = useState(false);
    const [userPhNo, setUserPhNo] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userDlNo, setUserDlNo] = useState('');


    const [sortOrder, setSortOrder] = useState('newest'); // Default sort order
  const [filtereddBikes, setFiltereddBikes] = useState(bikes); // Filtered bikes state

  const [historySortOrder, setHistorySortOrder] = useState("newest");

// Sort the bookingHistory based on historySortOrder
const displayedBookingHistory = [...bookingHistory].sort((a, b) => {
    // Combine booked_date and booked_time to create a Date object for comparison
    const dateTimeA = new Date(`${a.booked_date} ${a.booked_time}`);
    const dateTimeB = new Date(`${b.booked_date} ${b.booked_time}`);

    // Sort based on sortOrder
    if (sortOrder === "newest") {
        return dateTimeB - dateTimeA; // Newest first
    } else {
        return dateTimeA - dateTimeB; // Oldest first
    }
});

    useEffect(() => {
        checkUserRejection();
    }, []);
    useEffect(() => {
        const filteredAndSortedBikes = bikes
            .filter(bike =>
                bike.bike_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
                if (sortOrder === 'lowToHigh') {
                    return a.price - b.price;
                } else if (sortOrder === 'highToLow') {
                    return b.price - a.price;
                } else {
                    return 0;
                }
            });
    
        setFiltereddBikes(filteredAndSortedBikes);
    }, [bikes, searchQuery, sortOrder]);  // Trigger this effect when any of these values change
    
    
    useEffect(() => {
        if (rejected) {
            console.log("Rejection reason:", rejectionReason);
        }
    }, [rejected, rejectionReason]);
    const checkUserRejection = () => {
        const email = localStorage.getItem('userEmail');
        axios.post('http://localhost:8081/check_user_approval', { email })
            .then(response => {
                console.log(response.data.status)
                if (response.data.status === 'rejected') {
                    console.log(response.data.status)
                    console.log("Rejection reason:", response.data.rejection_reason);
                setRejectionReason(response.data.rejection_reason);
                    setRejected(true);
                }
            })
            .catch(err => {
                console.error('Error checking user approval:', err);
            });
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleReSubmit = () => {
        const email = localStorage.getItem('userEmail');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);
        formData.append('name', userName);
        formData.append('ph_no', userPhNo);
        formData.append('address', userAddress);
        formData.append('userDlNo', userDlNo); // Include dl_no in the form data
        axios.put(`http://localhost:8081/reenter_user_details/${email}/${userDlNo}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                alert('Details submitted for re-approval');
                setRejected(false); // Close the modal after submission
            })
            .catch(err => {
                console.error('Error re-submitting details:', err);
            });
    };
    
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
                    setCity(response.data.city);
                    console.log("city is "+response.data.city);
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
                    console.log(response.data.history);
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
        setSelectedBike(bike);
        setShowBookingOptions(true);
    };

    const handleBookingConfirmation = () => {
        if (pickupDate === dropoffDate && dropoffTime < pickupTime) {
            alert('Dropoff time cannot be before pickup time on the same day.');
            setDropoffTime('');
        }
        else if (pickupDate === dropoffDate && dropoffDate<pickupDate){
            alert('Pickup date cannot be before dropoff date')
        }
        else{
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
                        city: city,
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
        }
    };

    const handleDropoffDateChange = (date) => {
        if (pickupDate && new Date(date) < new Date(pickupDate)) {
            alert('Dropoff date cannot be before pickup date.');
            setDropoffDate('');
        } else {
            setDropoffDate(date);
        }
    };

    const handleDropoffTimeChange = (time) => {
        if (pickupDate === dropoffDate && time < pickupTime) {
            alert('Dropoff time cannot be before pickup time on the same day.');
            setDropoffTime('');
        } else {
            setDropoffTime(time);
        }
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
            <>
      {/* Sort Dropdown */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '20px' }}>
        <Form.Group controlId="sortOrder" style={{ maxWidth: '200px' }}>
          <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ fontSize: '0.875rem' }}>
            <option value="none">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </Form.Select>
        </Form.Group>
      </div>

      {/* Displaying Filtered Bikes */}
      <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          justifyContent: 'center',
      }}>
        {filtereddBikes.map((bike) => {
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
                    <div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>Not Available</div>
                    <div>
                      <p>Bike Available on {bike.dropoffDate}</p>
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
    </>
    <Modal show={showHistoryPopup} onHide={() => setShowHistoryPopup(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Rented History</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="mb-0"><strong>Sort By:</strong></p>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort">
                            {sortOrder === "newest" ? "Newest Booking" : "Oldest Booking"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortOrder("newest")}>
                                Newest Booking
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortOrder("oldest")}>
                                Oldest Booking
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {displayedBookingHistory.length > 0 ? (
                    <ol>
                        {displayedBookingHistory.map((booking, index) => (
                            <li key={index}>
                                <p><strong>Bike Name: </strong>{booking.bike_name}</p>
                                <p><strong>Pickup Date: </strong>{booking.pickupdate}</p>
                                <p><strong>Dropoff Date: </strong>{booking.dropoffdate}</p>
                                <p><strong>Total Amount: </strong>₹{booking.totalamount}</p>
                                <p><strong>Booked Date: </strong>{booking.booked_date}</p>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p>No rental history found.</p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowHistoryPopup(false)}>
                    Close
                </Button>
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
                            onChange={(e) => handleDropoffDateChange(e.target.value)}
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
                            onChange={(e) => handleDropoffTimeChange(e.target.value)}
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
             <div>
             <div>
             {rejected && (
                  <Modal show={rejected} backdrop="static" keyboard={false}>
                            <Modal.Header>
                                <Modal.Title>Re-enter Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                           
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/">
                <Button variant="info">Back</Button>
            </Link>
            <Link to="/">
                <Button onClick={handleLogout} variant="outline-warning" className="mb-3">Logout</Button>
            </Link>
        </div>
           
                                <h2>You have been rejected by the admin. <br/>Reason: {rejectionReason}.<br/> Please re-enter your details.</h2>
                                <Form>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" value={userPhNo} onChange={(e) => setUserPhNo(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formDLNo">
                                        <Form.Label>Driving License Number</Form.Label>
                                        <Form.Control type="text" value={userDlNo} onChange={(e) => setUserDlNo(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formDLFile">
                                        <Form.Label>Driving License File</Form.Label>
                                        <Form.Control type="file" onChange={handleFileChange} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleReSubmit}>Submit for Approval</Button>
                            </Modal.Footer>
                        </Modal>
            )}
        </div>
        </div>
        </div>
    );
}

export default User;