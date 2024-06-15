import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function Terms() {
    return (
        <div
        style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1449156733864-dd5471bb7427?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
        <Container className="py-5" style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1449156733864-dd5471bb7427?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '20px',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        }}>
            <Link to="/"><Button variant="outline-info">Home</Button></Link>
            <h2 style={{ color: 'white' }}>Terms and Conditions</h2>
            <p style={{ color: 'white' }}>
                Welcome to MotoBon Rentals. These terms and conditions outline the rules and regulations for the use of our bike rental services.
            </p>
            <p style={{ color: 'white' }}>
                By accessing our website or using our services, you accept these terms and conditions in full. Do not continue to use MotoBon Rentals' website or services if you do not accept all of the terms and conditions stated on this page.
            </p>
            <h3 style={{ color: 'white' }}>1. Rental Agreement</h3>
            <p style={{ color: 'white' }}>
                By renting a bike from MotoBon Rentals, you agree to abide by the terms and conditions outlined in this agreement. This agreement constitutes a legal contract between you and MotoBon Rentals.
            </p>
            <h3 style={{ color: 'white' }}>2. Rental Period</h3>
            <p style={{ color: 'white' }}>
                The rental period begins when you take possession of the rented bike and ends when you return it to MotoBon Rentals' designated location. Any extension of the rental period must be agreed upon in advance and may be subject to additional fees.
            </p>
            <h3 style={{ color: 'white' }}>3. Bike Condition</h3>
            <p style={{ color: 'white' }}>
                You are responsible for returning the rented bike in the same condition as it was at the beginning of the rental period. Any damage to the bike beyond normal wear and tear may result in additional charges.
            </p>
            <h3 style={{ color: 'white' }}>4. Liability</h3>
            <p style={{ color: 'white' }}>
                MotoBon Rentals is not liable for any injuries or accidents that occur while using our rented bikes. You assume all risks associated with biking and agree to indemnify and hold MotoBon Rentals harmless from any claims, damages, or losses.
            </p>
            <h3 style={{ color: 'white' }}>5. Payment</h3>
            <p style={{ color: 'white' }}>
                Payment for bike rental services is due at the time of rental. We accept cash, credit cards, and other forms of payment as specified on our website.
            </p>
            <h3 style={{ color: 'white' }}>6. Reservation</h3>
            <p style={{ color: 'white' }}>
                We recommend making reservations in advance to ensure availability. Reservations can be made online or by contacting MotoBon Rentals directly.
            </p>
            <h3 style={{ color: 'white' }}>7. Cancellation Policy</h3>
            <p style={{ color: 'white' }}>
                If you need to cancel your reservation, please notify MotoBon Rentals at least 24 hours before the scheduled rental time to receive a full refund. Cancellations made less than 24 hours in advance may be subject to a cancellation fee.
            </p>
            <h3 style={{ color: 'white' }}>8. Governing Law</h3>
            <p style={{ color: 'white' }}>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which MotoBon Rentals operates. Any disputes arising out of these terms and conditions will be resolved exclusively by the courts of that jurisdiction.
            </p>
            <p style={{ color: 'white' }}>
                If you have any questions about these terms and conditions, please contact us.
            </p>
        </Container>
        </div>
    );
}

export default Terms;
