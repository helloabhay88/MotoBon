import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Approval.css'; // Import your CSS file

const Approval = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8081/get_users_for_approval')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const handleApprove = (email) => {
        axios.put(`http://localhost:8081/approve_user_by_email/${email}`)
            .then(response => {
                console.log('User approved successfully');
                fetchUsers();
            })
            .catch(error => {
                console.error('Error approving user:', error);
            });
    };

    const handleViewDL = (dlPath) => {
        // Append ".pdf" to dl_no if it doesn't already have it
        const dlNoWithExtension = dlPath.endsWith('.pdf') ? dlPath : `${dlPath}.pdf`;
        window.open(`http://localhost:8081/dl_photo/${encodeURIComponent(dlNoWithExtension)}`, '_blank');
    };

    return (
        <div className="approval-container">
            <Link to="/admin"><Button className="back-button" variant="secondary">Back</Button></Link>
            <h1 className="approval-heading">Admin Approval</h1>
            <Table className="approval-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Driving License No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.email}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.ph_no}</td>
                            <td>{user.address}</td>
                            <td>{user.dl_no}</td>
                            <td>
                                {!user.approve ? (
                                    <Button variant="success" onClick={() => handleApprove(user.email)}>
                                        Approve
                                    </Button>
                                ) : (
                                    <span>Approved</span>
                                )}
                                <Button className="ms-2" variant="primary" onClick={() => handleViewDL(user.dl_no)}>
                                    View License
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Approval;
