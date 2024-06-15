import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Book() {
    const formContainerStyle = {
        padding: '40px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        color: 'black',
        backgroundImage: 'url("https://www.desktopbackground.org/p/2015/11/11/1040757_yamaha-black-bike-hd-wallpapers-dreamlovewallpapers_1280x800_h.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div style={{ backgroundSize: 'cover', height: '100vh', backgroundImage: 'url("https://www.desktopbackground.org/p/2015/11/11/1040757_yamaha-black-bike-hd-wallpapers-dreamlovewallpapers_1280x800_h.jpg")' }}>
            <h1>Booking</h1>
            <div style={formContainerStyle}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/43482/sp-125-right-front-three-quarter-2.jpeg?isig=0" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Link to="/Adminlogin"><Button variant="primary">Click me</Button></Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Book;
