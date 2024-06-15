import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Complaints() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = () => {
        axios.get('http://localhost:8081/contact_us')
            .then(response => {
                setComplaints(response.data);
            })
            .catch(error => {
                console.error('Error fetching complaints:', error);
            });
    };

    return (
        <div
            style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1519376108558-7b6471e87264?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: 'cover',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <Container className="py-5" style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '20px', padding: '50px' }}>
                <Link to="/Admin"><Button variant="info">Back</Button></Link><br/>
                <h2>Complaints or Suggestions</h2><br/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No: </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{complaint.name}</td>
                                <td>{complaint.email}</td>
                                <td>{complaint.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Complaints;
