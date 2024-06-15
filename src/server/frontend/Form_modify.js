import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import './FormModify.css'; // Import the CSS file

function FormModify() {
    const [formData, setFormData] = useState({
        reg_no: '',
        new_reg_no: '',
        bike_name: '',
        eng_no: '',
        chas_no: '',
        price: '',
        bike_condition: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes and update form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle the form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Make an HTTP PUT request to update the bike details
            const response = await axios.put(`http://localhost:8081/bikeDetails/${formData.reg_no}`, formData);
            console.log(response.data);
            setSuccessMessage('Bike details updated successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Failed to update bike details:', error);
            if (error.response && error.response.status === 404) {
                setErrorMessage('No registration number found');
            } else {
                setErrorMessage('Failed to update bike details. Please try again.');
            }
            setSuccessMessage('');
        }
    };

    // Handle form data retrieval based on the registration number
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // Make an HTTP GET request to retrieve bike details based on the entered registration number
            console.log(formData);
            const response = await axios.get(`http://localhost:8081/bikeDetails/${formData.reg_no}`);
            
            // Update the form data with the retrieved details
            const bikeDetails = response.data;
            setFormData({
                reg_no: bikeDetails.reg_no,
                new_reg_no: bikeDetails.new_reg_no || bikeDetails.reg_no,
                bike_name: bikeDetails.bike_name || '',
                eng_no: bikeDetails.eng_no || '',
                chas_no: bikeDetails.chas_no || '',
                bike_condition: bikeDetails.bike_condition || '',
                price: bikeDetails.price || '',
            });
            setErrorMessage('');
        } catch (error) {
            console.error('Failed to fetch bike details:', error);
            setErrorMessage('No registration number found');
            setFormData({
                reg_no: formData.reg_no,
                new_reg_no: '',
                bike_name: '',
                eng_no: '',
                chas_no: '',
                price: '',
                bike_condition: ''
            });
        }
    };

    // Handle page refresh
    const handleRefresh = () => {
        window.location.reload();
    };

    // Define the background image URL
    const backgroundImageUrl = 'https://wallpapers.com/images/high/4k-bike-in-an-alley-iclsxcrupafulv1b.webp';

    // Define the style for the background image
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    // Define the style for the form container
    const formContainerStyle = {
        padding: '60px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white' // Text color white in the form container
    };

    // Define the style for the success message
    const successMessageStyle = {
        color: 'white', // Text color white for success message
        backgroundColor: 'lightgreen', // Light green background color for success message
        textAlign: 'center',
        padding: '10px', // Add padding for better visibility
        borderRadius: '5px' // Add border radius for a rounded appearance
    };
    const failMessageStyle={
        color: 'white',
        backgroundColor: 'red',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '5px'
    }
    return (
        <div style={backgroundStyle} className="d-flex justify-content-center align-items-center vh-100">
            <div style={formContainerStyle}>
                <Form onSubmit={handleSearch}>
                    <Link to="/Admin">
                        <Button variant="secondary" style={{ color: 'white' }}>Back</Button>{' '}
                    </Link>
                    <h1 style={{ color: 'white' }}>Update Bike Details</h1>
                    <br />
                    <Row>
                        <Col>
                            <InputGroup>
                                <Form.Control
                                    id="reg_no"
                                    name='reg_no'
                                    placeholder="Enter Registration Number"
                                    value={formData.reg_no}
                                    onChange={handleChange}
                                    required
                                    className="white-placeholder" // Apply the CSS class for white placeholder
                                    style={{ color: 'white', backgroundColor: 'transparent' }} 
                                />
                                <InputGroup.Text style={{ backgroundColor: 'transparent' }}> {/* Make the background transparent */}
                                    <Button type="button" style={{ color: 'white' }} onClick={handleSearch}>Search</Button>
                                </InputGroup.Text>
                            </InputGroup>
                            <br />
                        </Col>
                    </Row>
                </Form>
                
                <Form onSubmit={handleUpdate}>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="new_reg_no" style={{ color: 'white' }}>New Registration Number:</Form.Label>
                            <Form.Control
                                id="new_reg_no"
                                name='new_reg_no'
                                value={formData.new_reg_no}
                                onChange={handleChange}
                                style={{ color: 'white', backgroundColor: 'transparent' }} // Set text and background color
                            />
                        </Col>
                        <Col>
                            <Form.Label htmlFor="bike_name" style={{ color: 'white' }}>Bike Name:</Form.Label>
                            <Form.Control
                                id="bike_name"
                                name='bike_name'
                                value={formData.bike_name}
                                onChange={handleChange}
                                required
                                style={{ color: 'white', backgroundColor: 'transparent' }} // Set text and background color
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label htmlFor="eng_no" style={{ color: 'white' }}>Engine Number:</Form.Label>
                            <Form.Control
                                id="eng_no"
                                name='eng_no'
                                value={formData.eng_no}
                                onChange={handleChange}
                                required
                                style={{ color: 'white', backgroundColor: 'transparent' }} // Set text and background color
                            />
                        </Col>
                        <Col>
                            <Form.Label htmlFor="chas_no" style={{ color: 'white' }}>Chassis Number:</Form.Label>
                            <Form.Control
                                id="chas_no"
                                name='chas_no'
                                value={formData.chas_no}
                                onChange={handleChange}
                                required
                                style={{ color: 'white', backgroundColor: 'transparent' }} // Set text and background color
                            />
                        </Col>
                        <Col>
                            <Form.Label htmlFor="bike_name" style={{ color: 'white' }}>Bike Condition:</Form.Label>
                            <Form.Control
                                id="bike_condition"
                                name='bike_condition'
                                value={formData.bike_condition}
                                onChange={handleChange}
                                required
                                style={{ color: 'white', backgroundColor: 'transparent' }} // Set text and background color
                            />
                        </Col>
                        <Col>
                            <Form.Label htmlFor="price" style={{ color: 'white' }}>Rent Price</Form.Label>
                            <Form.Control
                                id="price"
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                required
                                style={{ color: 'white', backgroundColor: 'transparent' }} // Set text and background color
                            />
                        </Col>
                    </Row>
                    <br />
                    <Button type="submit" className="m-2" variant="primary" style={{ color: 'white' }}>Save</Button>
                    <Button type="button" className="m-2" variant="secondary" style={{ color: 'white' }} onClick={handleRefresh}>Refresh</Button>
                    <br />
                    {successMessage && (
                        <div className="alert alert-success mt-2" style={successMessageStyle}>{successMessage}</div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger mt-2" style={failMessageStyle}>{errorMessage}</div>
                    )}
                </Form>
            </div>
        </div>
    );
}

export default FormModify;
