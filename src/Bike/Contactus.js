import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Contactus() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        console.log(name, email, message)
        axios.post('http://localhost:8081/contact_us', formData)
            .then(res => {
                console.log("ok");
                setSubmitMessage('Form submitted successfully.');
            })
            .catch(err => {
                console.log("failed");
                setSubmitMessage('Form submission failed. Please try again later.');
            });
    }

    return (
        <div
            style={{
                backgroundImage: `url(https://wallpapercave.com/wp/wp7472331.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container style={{ border: '2px solid rgba(255, 255, 255, 0.5)', borderRadius: '10px', padding: '5px', background: 'rgba(255, 255, 255, 0.1)' }}>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                    <Link to="/"><Button variant="info">Home</Button></Link>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Contact Us</h1>
                        <p style={{ color: 'white', textAlign: 'center' }}>If you have any complaints or suggestions, feel free to get in touch with us.</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Control type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)} required/><br />
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required/><br />
                            </Form.Group>

                            <Form.Group controlId="formMessage">
                                <Form.Control as="textarea" rows={3} placeholder="Enter your message" onChange={e => setMessage(e.target.value)} required/><br />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                           
                            {submitMessage && <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                    <br/>
                        <div style={{ background: 'rgba(0, 255, 0, 0.3)', borderRadius: '5px', padding: '10px', textAlign: 'center' }}>
                             <p style={{ color: 'white', margin: '0' }}>{submitMessage}</p>
                        </div>
                    </Col>
                </Row>}
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <div style={{ color: 'white', marginTop: '20px', textAlign: 'center' }}>
                            <h3>Our Location</h3>
                            <p>Motobon Rental,</p>
                            <p>Trivandrum, Kerala, India</p>
                            <p>Phone: +91 7907694440</p>
                            <p>Email: motobon@gmail.com</p>
                        </div>
                    </Col>
                </Row>
               
            </Container>
        </div>
    );
}

export default Contactus;
