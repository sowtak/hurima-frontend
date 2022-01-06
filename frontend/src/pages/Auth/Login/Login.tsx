/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {UserData} from "../../../types/types";
import {activateAccount, formReset, login} from "../../../redux/thunks/auth-thunks";
import {useParams} from "react-router";
import {FormContainer} from "../../../components/FormContainer/FormContainer";

import './Login.css';
import {FullPageLoader} from "../../../components/FullPageLoader/FullPageLoader";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state: AppStateType) => state.auth.error);
  const success = useSelector((state: AppStateType) => state.auth.success);
  const isRegistered = useSelector((state: AppStateType) => state.auth.isRegistered);
  const isLoggedIn= useSelector((state: AppStateType) => state.user.isLoggedIn);
  const loading: boolean = useSelector((state: AppStateType) => state.auth.loading);
  const user = useSelector((state: AppStateType) => state.auth.user);

  const {code} = useParams();
  const navigate = useNavigate();

  if ((localStorage.getItem("isLoggedIn")) || isLoggedIn){
    navigate(`/${user.username}`);
  }

  useEffect(() => {
    dispatch(formReset());
    if (code) {
      console.log(success)
      console.log(isRegistered);
      dispatch(activateAccount(code));
    }
  }, []);



  const handleSignIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const userData: UserData = {email, password};
    dispatch(login(userData));
  }

  return (
      <FormContainer>
        {loading ? <FullPageLoader/> : null}
        <h1>Login to HUrima</h1>
        <hr/>
        {error ? <div className='alert alert-danger col-lg' role='alert'>{error}</div> : null}
        {success ? <div className='alert alert-success col-lg' role='alert'>{success}</div> : null}
        <Form onSubmit={handleSignIn}>
          <FormGroup id='email' className='form-group'>
            <FormLabel className='form-label'> Email</FormLabel>
            <FormControl
              required
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            />
          </FormGroup>

          <FormGroup id='password' className='form-group'>
            <FormLabel>Password</FormLabel>
            <FormControl
              required
              placeholder='Password'
              type='password'
              value={password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            />
          </FormGroup>

          <Row className='py-1'>
            <Col>
              <Link to='/forgot-password'>Forgot password?</Link>
            </Col>
          </Row>

          <br/>

          <div className='d-grid gap-2'>
            <Button type='submit' variant='primary'>
              Log in
            </Button>
          </div>
        </Form>

        <Row className='py-3'>
          <Col>
            Don't have an account? <Link to="/registration">Sign up</Link>
          </Col>
        </Row>
      </FormContainer>
  );
};