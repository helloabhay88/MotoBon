import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [ph_no, setPh_no] = useState('');
    const [city, setCity] = useState('');
    const [state] = useState('Kerala'); // Set Kerala as default and readonly state
    const [zip, setZip] = useState('');
    const [dl_no, setDl_no] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [file, setFile] = useState(null);
    const backgroundImageUrl = 'https://images.pexels.com/photos/750817/pexels-photo-750817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    const navigate = useNavigate();
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
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: '#000',
    };

    function handleSubmit(event) {
        event.preventDefault();

        // Validate city selection
        if (city === "Choose..." || city === "") {
            alert("Please select a city.");
            return;
        }

        // Validate phone number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(ph_no)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Validate zip code
        const zipRegex = /^\d+$/;
        if (!zipRegex.test(zip)) {
            alert("Please enter a valid numeric zip code.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Create a FormData object to hold all form fields and file
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('address', address);
        formData.append('ph_no', ph_no);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('zip', zip);
        formData.append('dl_no', dl_no);
        formData.append('file', file);

        axios.post('http://localhost:8081/user_signin', formData)
            .then(res => {
                window.alert("Sign in successful! Welcome!");

                // Navigate to UserLogin after clicking OK in alert
                navigate('/UserLogin');
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.error === 'Duplicate entry') {
                    setResultMessage("Error: Email address already in use. Please use a different email.");
                } else {
                    setResultMessage("Error: Sign in failed. Please try again.");
                }
                console.error("Error:", err);
            });
    }

    return (
        <div style={style}>
            <div style={formContainerStyle}>
                <Link to="/">
                    <Button variant="outline-primary" className="mb-3">Home</Button>
                </Link>
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Create new Account</h1>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Control
                                type="name"
                                placeholder="Enter Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                minLength={5}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridConfirmPassword">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Control
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridDl">
                        <Form.Control
                            placeholder="Driving license No"
                            value={dl_no}
                            onChange={e => setDl_no(e.target.value)}
                            maxLength={15}
                            minLength={15}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridPhone">
                        <Form.Control
                            placeholder="Phone Number"
                            value={ph_no}
                            onChange={e => setPh_no(e.target.value)}
                            maxLength={10}
                            minLength={10}
                            required
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Select
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            >
                                <option value="Choose...">Choose...</option>
                                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                <option value="Kochi">Kochi</option>
                                <option value="Alappuzha">Alappuzha</option>
                                <option value="Palakkad">Palakkad</option>
                                <option value="Malapuram">Malapuram</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control
                                placeholder="State"
                                value={state}
                                readOnly
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Control
                                placeholder="Zip"
                                value={zip}
                                onChange={e => setZip(e.target.value)}
                                maxLength={6}
                                minLength={6}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3 mt-3" controlId="formGridFile">
                        {/* Adding a label for the file input */}
                        <Form.Label htmlFor="formGridFile"><h5>Upload your driving license:</h5></Form.Label>
                        <Form.Control
                            type="file"
                            accept="application/pdf"
                            onChange={e => setFile(e.target.files[0])}
                            required
                        />
                    </Form.Group>
                    <h6>You need to be approved by the admin to rent a bike.</h6>
                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>
                    {/* <Link to="/Userlogin">
                        <Button className="m-2" variant="secondary">Log in</Button>
                    </Link> */}
                </Form>
                {resultMessage && <p className="mt-3">{resultMessage}</p>}
            </div>
        </div>
    );
}

export default Signin;