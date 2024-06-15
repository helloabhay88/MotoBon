import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Form_search() {
    const [regNo, setRegNo] = useState('');
    const [data, setData] = useState([]);

    const handleRegNoChange = (event) => {
        setRegNo(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:8081/bikedetails?reg_no=${regNo}`)
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    };

    // Define the background image URL
    const backgroundImageUrl = 'https://wallpapers.com/images/high/4k-bike-ducati-scrambler-p5ztqfie3vnj5kkp.webp';

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
        border: '1px solid black',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // White with alpha for transparency
    };

    // Define the style for the table
    const tableStyle = {
        marginTop: '20px',
        border: '1px solid black',
        backgroundColor: 'white', // Set table background color to white for better visibility
        padding: '10px',
        borderRadius: '10px',
    };

    // Define the style for the table cells
    const tableCellStyle = {
        textAlign: 'left',
        border: '1px solid black',
        padding: '8px', // Add padding to cells for better spacing
        color: 'black', // Use dark text for better readability
    };

    return (
        <div style={backgroundStyle} className="d-flex justify-content-center align-items-center vh-100">
            <div style={formContainerStyle}>
                <Form onSubmit={handleSearch}>
                    <Link to="/Admin"><Button variant="secondary" style={{ color: 'white' }}>Back</Button>{' '}</Link>
                    <h1 style={{ color: 'white' }}>Enter Vehicle Number</h1>
                    <Row>
                        <Col>
                            <Form.Control
                                placeholder="Registration Number"
                                name="reg_no"
                                value={regNo}
                                onChange={handleRegNoChange}
                            />
                        </Col>
                    </Row>
                    <Button type="submit" className="m-2" variant="primary">View</Button>
                </Form>

                {data.length > 0 && (
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={tableCellStyle}>Register Number</th>
                                <th style={tableCellStyle}>Bike Name</th>
                                <th style={tableCellStyle}>Engine Number</th>
                                <th style={tableCellStyle}>Chassis Number</th>
                                <th style={tableCellStyle}>Bike Condition</th>
                                <th style={tableCellStyle}>Rent price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i}>
                                    <td style={tableCellStyle}>{d.reg_no}</td>
                                    <td style={tableCellStyle}>{d.bike_name}</td>
                                    <td style={tableCellStyle}>{d.eng_no}</td>
                                    <td style={tableCellStyle}>{d.chas_no}</td>
                                    <td style={tableCellStyle}>{d.bike_condition}</td>
                                    <td style={tableCellStyle}>{d.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Form_search;
