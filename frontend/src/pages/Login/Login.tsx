/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {Message} from "../../components/Message/Message";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {UserData} from "../../types/types";
import {activateAccount, formReset, login} from "../../redux/thunks/auth-thunks";
import {FullPageLoader} from "../../components/FullPageLoader/FullPageLoader";
import {useLocation, useMatch} from "react-router";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useSelector((state: AppStateType) => state.auth);
  const error = userInfo.error;
  const success = userInfo.success;
  const loading = userInfo.loading;
  const isLoggedIn = useSelector((state: AppStateType) => state.user.isLoggedIn);


  const history = useNavigate();
  const location = useLocation();
  const match = useMatch(location.pathname);

  useEffect(() => {
    dispatch(formReset());
    if (match?.params.code) {
      dispatch(activateAccount(match.params.code));
    }
  }, [history, isLoggedIn]);

  const handleSignIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const userData: UserData = {usernameOrEmail, password};
    dispatch(login(userData, history));
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h1>Login</h1>
            {error && <Message variant='alert alert-danger'>{JSON.stringify(error)}</Message>}
            {success && <Message variant='alert alert-success'>{JSON.stringify(success)}</Message>}

            <Form onSubmit={handleSignIn}>
              <FormGroup id='usernameOrEmail'>
                <FormLabel>Username or Email</FormLabel>
                <FormControl
                  placeholder='Username or Email'
                  value={usernameOrEmail}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setUsernameOrEmail(event.target.value)}
                />
              </FormGroup>

              <FormGroup id='password'>
                <FormLabel>Password</FormLabel>
                <FormControl
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />
              </FormGroup>
              <hr/>
              <Button type='submit' variant='primary'>
                Login
              </Button>
            </Form>

            <Row className='py-3'>
              <Col>
                You don't have an account? <Link to="/registration">Register</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {loading && <FullPageLoader/>}
    </div>
  );
};