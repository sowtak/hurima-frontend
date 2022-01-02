/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {UserData} from "../../types/types";
import {activateAccount, formReset, login} from "../../redux/thunks/auth-thunks";
import {useLocation, useMatch, useParams} from "react-router";
import {FormContainer} from "../../components/FormContainer/FormContainer";

import './Login.css';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useSelector((state: AppStateType) => state.auth);
  const error = userInfo.error;
  const success = userInfo.success;
  const loading = userInfo.loading;

  const {code} = useParams();

  useEffect(() => {
    dispatch(formReset());
    if (code) {
      console.log(code);
      dispatch(activateAccount(code));
    } else {
      console.log("CODE NOT FOUND!!!!!!!!!!!!!");
    }
  }, []);

  const handleSignIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const userData: UserData = {usernameOrEmail, password};
    dispatch(login(userData));
  }

  return (
      <FormContainer>
        <h1>Login to HUrima</h1>
        <hr/>
        {error && <div className='alert alert-danger col-lg'>{error}</div>}
        {success && <div className='alert alert-success col-lg'>{success}</div>}

        <Form onSubmit={handleSignIn}>
          <FormGroup id='usernameOrEmail' className='form-group'>
            <FormLabel>Username or Email</FormLabel>
            <FormControl
              required
              placeholder='Username or Email'
              value={usernameOrEmail}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setUsernameOrEmail(event.target.value)}
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