import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
function AboutUs() {
    return (
        <div
            style={{
                backgroundImage: `url(https://i.pinimg.com/originals/79/de/93/79de93ecd0acba7e8da67897e96486b5.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container className="py-5" style={{ border: '2px solid rgba(255, 255, 255, 0.5)', borderRadius: '10px', padding: '20px', background: 'rgba(255, 255, 255, 0.2)' }}>
                <Row>
                    <Col>
                    <Link to="/"><Button variant="outline-info">Home</Button></Link>
                        <h2 style={{ color: 'white' }}>About Us</h2>
                        <p style={{ color: 'white' }}>
                            MotoBon Rentals is a premier bike rental service dedicated to providing the best biking experience to our customers. We offer a wide range of high-quality bikes for rent, ensuring that riders can explore the beautiful landscapes of Trivandrum and beyond.
                        </p>
                        <p style={{ color: 'white' }}>
                            At MotoBon, our mission is to promote eco-friendly transportation solutions while delivering exceptional customer service and fostering a sense of community among biking enthusiasts.
                        </p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h3 style={{ color: 'white' }}>Our History</h3>
                        <p style={{ color: 'white' }}>
                            Founded in 20XX by passionate cyclists John Doe and Jane Smith, MotoBon Rentals has quickly grown from a small startup to a leading bike rental service in Trivandrum. Over the years, we've expanded our fleet and services to meet the growing demand for sustainable transportation options in the region.
                        </p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h3 style={{ color: 'white' }}>Our Team</h3>
                        <p style={{ color: 'white' }}>
                            Meet the dedicated team behind MotoBon Rentals:
                        </p>
                        <ul style={{ color: 'white' }}>
                            <p>Abhay S. Babu - Co-Founder & CTO</p>
                            <p>Aby Thomas - Co-Founder & COO</p>
                            <p>Anto B George - CMO</p>
                            <p>Varun - Vice President</p>
                            <p>Moncy Varghese - Senior Manager</p>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h3 style={{ color: 'white' }}>Community Involvement</h3>
                        <p style={{ color: 'white' }}>
                            At MotoBon, we believe in giving back to the community. That's why we actively participate in local biking events, sponsor charity rides, and support environmental conservation efforts. We're proud to be part of the Trivandrum biking community and strive to make a positive impact wherever we go.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AboutUs;
