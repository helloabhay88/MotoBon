import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Userlogin() {
    // URL for the background image
    const backgroundImageUrl = 'https://wallpapercave.com/wp/wp2691127.jpg';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Check for user login status when the component mounts
    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
        if (isUserLoggedIn) {
            navigate('/User');
        }
    }, [navigate]);

    // Style object to apply background image
    const style = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    // Styling for the form container
    const formContainerStyle = {
        padding: '40px', // Adjust padding as needed
        borderRadius: '10px', // Rounded corners
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // RGBA value for transparency
        border: '1px solid rgba(255, 255, 255, 0.6)', // Light border with transparency
        color: '#000', // Ensure text color is readable
    };

    const buttonStyle = {
        color: 'white', // Set button text color to white
    };

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/user_login', { email, password })
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('isUserLoggedIn', true);
                    localStorage.setItem('userEmail', email);
                    navigate('/User');
                } else {
                    setMessage('Login failed: ' + res.data.message);
                }
            })
            .catch(err => {
                setMessage('Error: ' + err.message);
            });
    }

    return (
        <div style={style}>
            <div style={formContainerStyle}>
                <Link to="/">
                    <Button style={buttonStyle} variant="outline-info" className="mb-3">Back</Button>
                </Link>
                
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">User Login</h1>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mb-3">Sign in</Button>
                    <div className="mb-3">
                        {message && <div>{message}</div>}
                    </div>
                    <div className="text-center">
                        <Link to="/Userlogin">
                            <Button style={buttonStyle} variant="outline-info">User</Button>
                        </Link>
                        <Link to="/Adminlogin">
                            <Button style={buttonStyle} variant="outline-warning" className="ms-3">Admin</Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Userlogin;
