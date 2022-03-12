import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import queryString from 'query-string';
import Loader from '../components/Loader';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);

  const parsedQueryString = queryString.parse(location.search);
  const redirect = parsedQueryString.redirect
    ? parsedQueryString.redirect
    : null;

  const submitHandler = (e) => {
    setMessages([]);
    e.preventDefault();
    let errorMessages = [];
    Object.entries({ email, password }).forEach(e => {
      if (!e[1] || e[1] === '') {
        errorMessages.push(e[0] + " is required.");
      }
    })
    setMessages(errorMessages);
    if (errorMessages.length === 0) dispatch(login(email, password));
  };

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect ? redirect : '/');
    }
  }, [userInfo, history, redirect]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {messages.length > 0 && messages.map((e, i) =>
        <Message variant='danger' key={i}>{e}</Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Button type='submit' variant='primary'>
          Sign In
        </Button>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
