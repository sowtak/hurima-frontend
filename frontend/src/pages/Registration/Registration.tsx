/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:17 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {formReset, registration} from "../../redux/thunks/auth-thunks";
import {AuthErrors, UserRegistration} from "../../types/types";
import {Message} from "../../components/Message/Message";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormContainer} from "../../components/FormContainer/FormContainer";

import './Registration.css';

export const Registration: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const isRegistered: boolean = useSelector((state: AppStateType) => state.auth.isRegistered);
  const loading: boolean = useSelector((state: AppStateType) => state.auth.loading);
  const errors: Partial<AuthErrors> = useSelector((state: AppStateType) => state.auth.errors);
  const {emailError, passwordError, password2Error} = errors;

  const dispatch = useDispatch();
  const userData = useSelector((state: AppStateType) => state.auth);
  let error = userData.error;

  useEffect(() => {
    dispatch(formReset());
  });

  useEffect(() => {
    setEmail("");
    setUsername("");
    setPassword("");
    setPassword2("");
  }, [isRegistered]);

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userRegistrationData: UserRegistration = {username, email, password, password2};
    dispatch(registration(userRegistrationData));
  }

  return (
    <div>
      <FormContainer>
        <h1>User Registration</h1>
        <br/>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{JSON.stringify(error)}</Message>}

        <Form onSubmit={handleRegister}>
          <FormGroup id='username' className='form-group'>
            <FormLabel>Username</FormLabel>
            <FormControl
              required
              placeholder='Username'
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </FormGroup>

          <FormGroup id='email' className='form-group'>
            <FormLabel>Email</FormLabel>
            <FormControl
              required
              placeholder='Email'
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup id='password' className='form-group'>
            <FormLabel>Password</FormLabel>
            <FormControl
              type='password'
              required
              placeholder='Password'
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup id='password2' className='form-group'>
            <FormLabel>Password (Confirm)</FormLabel>
            <FormControl
              type='password'
              required
              placeholder='Password (Confirm)'
              value={password2}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
            />
          </FormGroup>

          <hr/>

          <div className='d-grid gap-2'>
            <Button type='submit' variant='primary'>
              Sign up
            </Button>
          </div>
        </Form>

        <Row className='py-3'>
          <Col>
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};