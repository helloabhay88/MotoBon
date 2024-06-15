import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'; // Import right and left arrow icons

function Main() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/bikedetails')
      .then(response => {
        setBikes(response.data);
      })
      .catch(err => {
        console.error('Error fetching bikes:', err);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="background-image">
        <Navbar expand="lg" className={`bg-body-tertiary ${isScrolled ? 'navbar-scrolled' : ''}`} style={{ zIndex: 2 }}>
          <Container>
            <Navbar.Brand href="#home" className="navbar-brand-top" style={{ fontSize: '24px', fontWeight: 'bold', paddingLeft: '1px' }}>
              MotoBon
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/About_us" className="me-2" style={{ textDecoration: 'none' }}>About us</Nav.Link>
                <Nav.Link as={Link} to="/Contact_us" className="me-2" style={{ textDecoration: 'none' }}>Contact us</Nav.Link>
                <Nav.Link as={Link} to="/Terms" className="me-2" style={{ textDecoration: 'none' }}>Terms and Conditions</Nav.Link>
              </Nav>
              <div className="ms-auto d-flex align-items-center">
                <div className="divider"></div>
                <Link to="/Userlogin">
                  <Button variant="outline-info" className="me-2">Login</Button>
                </Link>
                <Link to="/signin">
                  <Button variant="warning">Sign up</Button>{' '}
                </Link>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center text-center fixed-top w-100 " style={{ height: '100vh', zIndex: 0 }}>
        <h1 className={`montserrat ${isScrolled ? 'fade-out' : ''}`}>Explore with Every Turn</h1>
        <Link to="/signin"><Button variant="outline-light" className={`me-2 animated-button font-weight-bold ${isScrolled ? 'fade-out' : ''}`}>Register Now!</Button></Link>
      </div>
      <h1>Featured Bikes</h1>
      <Container className="mt-5">
        <div style={{ marginTop: '20px', position: 'relative', zIndex: 1 }}>
          <Carousel
            prevLabel=""
            nextLabel=""
            nextIcon={<FaArrowAltCircleRight className="custom-carousel-control-next-icon" />}
            prevIcon={<FaArrowAltCircleLeft className="custom-carousel-control-prev-icon" />}
            className="custom-carousel"
          >
            {[...Array(Math.ceil(bikes.length / 4))].map((_, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-around">
                  {[...Array(4)].map((_, cardIndex) => {
                    const bikeIndex = index * 4 + cardIndex;
                    if (bikeIndex >= bikes.length) return null;
                    const bike = bikes[bikeIndex];

                    return (
                      <Card key={bike.reg_no} style={{
                        width: '300px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        marginBottom: '20px',
                        marginRight: '20px'
                      }}>
                        <Card.Img
                          variant="top"
                          src={`http://localhost:8081/bike_photo_path/${bike.reg_no}.jpg`}
                          alt={bike.reg_no}
                          style={{ height: '210px', objectFit: 'cover' }}
                        />
                        <Card.Body>
                          <Card.Title>{bike.bike_name}</Card.Title>
                          <Card.Text>{bike.description}</Card.Text>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to="/Userlogin"><Button variant="primary">Rent</Button></Link>
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Container>
    </>
  );
}

export default Main;
