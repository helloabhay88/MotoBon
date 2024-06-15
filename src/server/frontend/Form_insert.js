import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Formm() {
    const [values, setValues] = useState({
        reg_no: '',
        eng_no: '',
        chas_no: '',
        bike_name: '',
        price: '',
        bike_condition: ''
    });
    const [status, setStatus] = useState(undefined);
    const [file, setFile] = useState(null);

    // Handle changes to input fields
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    // Refresh the page
    const refresh = () => {
        window.location.reload(false);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Create a FormData instance to send the form data
        const formData = new FormData();
        formData.append('reg_no', values.reg_no);
        formData.append('eng_no', values.eng_no);
        formData.append('chas_no', values.chas_no);
        formData.append('bike_name', values.bike_name);
        formData.append('price',values.price);
        formData.append('bike_condition',values.bike_condition);
        formData.append('bike_photo', file); // Append the bike photo file
        
        try {
            // Send POST request with the FormData
            await axios.post('http://localhost:8081/bikeDetails', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setStatus({ type: 'success' });
        } catch (err) {
            console.log("Error occurred:", err);
            if (err.response && err.response.data && err.response.data.error === 'Duplicate entry') {
                setStatus({ type: 'error', message: 'Duplicate entry detected. Not registered.' });
            } else {
                setStatus({ type: 'error', message: 'An unexpected error occurred.' });
            }
        }
    };

    // Define the background image URL
    const backgroundImageUrl = 'https://wallpapers.com/images/high/bmw-k100-4k-bike-4xroaj9knlah5hn5.webp';

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
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // White background with opacity for transparency
        padding: '60px',
        borderRadius: '20px',
        border: '1px solid black',
    };

    return (
        <div style={backgroundStyle} className='d-flex justify-content-center align-items-center vh-100'>
            <div style={formContainerStyle}>
                <Form onSubmit={handleSubmit}>
                    <Link to="/Admin"><Button variant="secondary">Back</Button>{' '}</Link>
                    {/* Set the heading color to white */}
                    <h1 style={{ color: 'white' }}>Enter Bike Details</h1>
                    <br />
                    <Row>
                        <Col>
                            <Form.Control
                                placeholder="Registration Number"
                                name='reg_no'
                                value={values.reg_no}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Bike Name"
                                name='bike_name'
                                value={values.bike_name}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Control
                                placeholder="Engine Number"
                                name='eng_no'
                                value={values.eng_no}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Chassis Number"
                                name='chas_no'
                                value={values.chas_no}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Bike Condition"
                                name='bike_condition'
                                value={values.bike_condition}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Rent Price"
                                name='price'
                                value={values.price}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Form.Group className="mb-3 mt-3" controlId="formGridFile">
                        <Form.Label htmlFor="formGridFile">
                            <h5 style={{ color: 'white' }}>Upload Bike Image:</h5>
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*" // Allow image files
                            onChange={e => setFile(e.target.files[0])}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Button type="submit" className="m-2" variant="primary">Save</Button>
                    <Button type="submit" className="m-2" onClick={refresh} variant="primary">New</Button>
                    <br />
                    {status?.type === 'success' && (
    <p style={{ color: 'green', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '5px' }}>
        {values.reg_no} is Registered successfully
    </p>
)}
{status?.type === 'error' && (
    <p style={{ color: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '5px' }}>
        {status.message}
    </p>
)}

                </Form>
            </div>
        </div>
    );
}

export default Formm;
