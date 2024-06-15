import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
function Adminlogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isAdminLoggedIn) {
            navigate('/Admin');
        }
    }, [navigate]);
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/admin_login', { email, password })
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('isAdminLoggedIn', true);
                    navigate('/Admin');
                } else {
                    setMessage('Login failed: ' + res.data.message);
                }
            })
            .catch(err => {
                setMessage('Error: ' + err.message);
            });
    }

    const backgroundImageUrl = 'https://wallpapercave.com/wp/wp3647913.jpg';
    const style = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

   
    const formContainerStyle = {
        padding: '40px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        color: '#000',
    };

    
    const buttonStyle = {
        color: 'white',
    };

    return (
        <div style={style}>
            <div style={formContainerStyle}>
                <Link to="/">
                    <Button style={buttonStyle} variant="outline-warning" className="mb-3">Back</Button>
                </Link>
               
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Admin Login</h1>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mb-3">Sign in</Button>
                    {/* Display message */}
                    <div className="mb-3">
                        {message && <div>{message}</div>}
                    </div>
                    <div className="text-center">
                        <Link to="/Userlogin">
                            <Button variant="outline-info" style={buttonStyle}>User</Button>
                        </Link>
                        <Link to="/Adminlogin">
                            <Button variant="outline-warning" style={buttonStyle} className="ms-3">Admin</Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Adminlogin;
