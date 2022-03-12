import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import queryString from 'query-string';
import Loader from '../components/Loader';
import { capitalizeFirstLetter } from '../utils/commonUtil';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messages, setMessages] = useState([]);

    const parsedQueryString = queryString.parse(location.search);
    const redirect = parsedQueryString.redirect
        ? parsedQueryString.redirect
        : null;

    const submitHandler = (e) => {
        setMessages([]);
        e.preventDefault();
        let errorMessages = [];
        Object.entries({ name, email, password, confirmPassword }).forEach(e => {
            if (!e[1] || e[1] === '') {
                let key = e[0] === "confirmPassword" ? "confirm password" : e[0];
                errorMessages.push(capitalizeFirstLetter(key) + " is required.");
            }
        })
        if (password !== confirmPassword) errorMessages.push("Password and Confirm password didn't match.");
        setMessages(errorMessages);
        if (errorMessages.length === 0) dispatch(register(name, email, password));
    };

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect ? redirect : '/');
        }
    }, [userInfo, history, redirect]);

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {messages.length > 0 && messages.map((e, i) =>
                <Message variant='danger' key={i}>{e}</Message>
            )}
            {error && <Message variant='danger'>{error}</Message>}
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
                    Register
                </Button>

                <Row className='py-3'>
                    <Col>
                        Have an account?{' '}
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        >
                            Login
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
}

export default RegisterScreen