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
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useLocation} from "react-router";

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
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h1>新規登録</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{JSON.stringify(error)}</Message>}

            <Form onSubmit={handleRegister}>
              <FormGroup id='username'>
                <FormLabel>ユーザ名</FormLabel>
                <FormControl
                  required
                  placeholder='ユーザ名'
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
              </FormGroup>

              <FormGroup id='email'>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl
                  required
                  placeholder='@hokudai.ac.jp で終わるメールアドレス'
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup id='password'>
                <FormLabel>パスワード</FormLabel>
                <FormControl
                  type='password'
                  required
                  placeholder='パスワード'
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup id='password2'>
                <FormLabel>パスワード(確認)</FormLabel>
                <FormControl
                  type='password'
                  required
                  placeholder='パスワード(確認)'
                  value={password2}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
                />

              </FormGroup>

              <Form.Group controlId='email'/>
              <hr/>
              <Button type='submit' variant='primary'>
                登録
              </Button>
            </Form>

            <Row className='py-3'>
              <Col>
                既に登録済みの方は<Link to="/login">ログイン</Link>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  )
}