import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { updateUser } from '../actions/userActions';
import Loader from '../components/Loader';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messages, setMessages] = useState([]);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, success, error } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, history]);

    const submitHandler = (e) => {
        setMessages([]);
        e.preventDefault();
        let errorMessages = [];
        if (!name || name === "") errorMessages.push("Name is required.");
        if (!email || email === "") errorMessages.push("Email is required.");
        if (password !== confirmPassword) errorMessages.push("Password and Confirm password didn't match.");
        setMessages(errorMessages);
        if (errorMessages.length === 0) {
            dispatch(updateUser({ id: userInfo._id, name, email, password }));
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {messages.length > 0 && messages.map((e, i) =>
                    <Message variant='danger' key={i}>{e}</Message>
                )}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile updated successfully.</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
}

export default ProfileScreen