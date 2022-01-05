/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 1:51 PM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Button, Col, Container, Form, FormControl, FormLabel, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {FullPageLoader} from "../../components/FullPageLoader/FullPageLoader";
import {forgotPassword} from "../../redux/thunks/auth-thunks";

export const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: AppStateType) => state.auth.error);
  const success = useSelector((state: AppStateType) => state.auth.success);
  const loading = useSelector((state: AppStateType) => state.auth.loading);
  const [email, setEmail] = useState<string>('');
  const [emailValidationError, setEmailValidationError] = useState<string>("");

  const handleSendEmail = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const validationErrorMessage = (email === undefined || !email.match("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9_.+-]")) ? "Invalid Email" : "";

    if (validationErrorMessage !== "") {
      setEmailValidationError(validationErrorMessage);
      console.log(validationErrorMessage);
    } else {
      console.log("SENDING PASSWORD RESET CODE TO GIVEN EMAIL");
      dispatch(forgotPassword({email: email}));
    }
  }

  return (
    <Container className='mt-5'>
      {loading? <FullPageLoader/> : null}

      <h1>Find Your Account</h1>
      <br/>
      <p>Please enter your email to search for your account.</p>
      {error ? <div className='alert- alert-danger col-lg' role='alert'>{error}</div> : null}
      {success ? <div className='alert- alert-success col-lg' role=''>{success}</div> : null}

      <Form onSubmit={handleSendEmail}>
        <Row>
          <Col>
            <FormLabel className='col-lg-2'>Email</FormLabel>
            <div className='col-lg-4'>
              <FormControl type='email'
                           value={email}
                           className={emailValidationError ? 'form-control is-invalid' : ''}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              />
              <div className='invalid-feedback'>{emailValidationError}</div>
            </div>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col>
            <Button type='submit' variant='primary'>
              <i className='fas fa-paper-plane send-reset-code'><span className='ps-2'>Send reset code</span></i>
            </Button>
          </Col>
        </Row>

      </Form>
    </Container>
  )
}