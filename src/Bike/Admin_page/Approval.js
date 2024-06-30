import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Approval.css'; // Import your CSS file

const Approval = () => {
    const [users, setUsers] = useState([]);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionEmail, setRejectionEmail] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8081/get_users_for_approval')
            .then(response => {
                console.log(response.data);
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

    const handleReject = () => {
        axios.put(`http://localhost:8081/reject_user_by_email/${rejectionEmail}`, { reason: rejectionReason })
            .then(response => {
                console.log('User rejected successfully');
                fetchUsers();
                setShowRejectModal(false);
            })
            .catch(error => {
                console.error('Error rejecting user:', error);
            });
    };

    const handleViewDL = (dlPath) => {
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
                                {user.status === 'pending' && (
                                    <Button className="ms-2" variant="danger" onClick={() => {
                                        setRejectionEmail(user.email);
                                        setShowRejectModal(true);
                                    }}>Reject</Button>
                                )}
                                <Button className="ms-2" variant="primary" onClick={() => handleViewDL(user.dl_no)}>
                                    View License 
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRejectionReason">
                            <Form.Label>Reason for Rejection</Form.Label>
                            <Form.Control
                                type="text"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRejectModal(false)}>Close</Button>
                    <Button variant="danger" onClick={handleReject}>Reject</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Approval;
