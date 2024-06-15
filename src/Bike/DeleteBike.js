import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function DeleteBike() {
    const [bikes, setBikes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBikes();
    }, []);

    const fetchBikes = () => {
        axios.get('http://localhost:8081/bikedetails')
            .then(response => {
                setBikes(response.data);
            })
            .catch(err => {
                console.error('Error fetching bikes:', err);
            });
    };

    const handleDelete = (bikeRegNo) => {
        axios.delete(`http://localhost:8081/deleteBike/${bikeRegNo}`)
            .then(response => {
                setMessage(response.data.message);
                fetchBikes(); // Refresh the bike list after deletion
                setShowModal(true); // Show modal after deletion
            })
            .catch(err => {
                setMessage('Error deleting bike: ' + err.message);
                setShowModal(true); // Show modal even if there's an error
            });
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div
            style={{
                padding: '20px',
                backgroundImage: 'url(https://img.freepik.com/free-photo/empty-street-dark-atmosphere_23-2150914402.jpg?t=st=1716219153~exp=1716222753~hmac=a248a2df8191eaa2562de65e87c2670b16c7b020f536cc25557a8a6bf719de87&w=740)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh'
            }}
        >
            <Link to="/Admin"><Button variant="info">Back</Button></Link>
            <h2 style={{ color: 'white' }}>Delete Bike</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
                justifyContent: 'center',
            }}>
                {bikes.map((bike) => {
                    const imageUrl = `http://localhost:8081/bike_photo_path/${bike.reg_no}.jpg`;

                    return (
                        <Card key={bike.reg_no} style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', opacity: 0.9 }}>
                            <Card.Img
                                variant="top"
                                src={imageUrl}
                                alt={bike.reg_no}
                                style={{ height: '240px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>{bike.bike_name}</Card.Title>
                                <Card.Title>{bike.reg_no}</Card.Title>
                                <Button variant="danger" onClick={() => handleDelete(bike.reg_no)}>Delete Bike</Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Bike</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteBike;
