/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 1:51 PM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {Spinner} from "../../components/Spinner/Spinner";
import {forgotPassword} from "../../redux/thunks/auth-thunks";
import {useForgotPasswordStyles} from "./ForgotPasswordStyles";
import {Alert, Button} from "@mui/material";
import {ForgotPasswordTextField} from "./ForgotPasswordTextField";
import {Feedback, Send} from "@mui/icons-material";

export const ForgotPassword: FC = () => {
  const classes = useForgotPasswordStyles();
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
    <div className={classes.container}>
      <h1>Find Your Account</h1>
      <br/>
      <p>Please enter your email to search for your account.</p>
      {error ? <Alert severity='error'>{error}</Alert> : null}
      {success ? <Alert severity='success'>{success}</Alert> : null}

      <form onSubmit={handleSendEmail}>
        <div className={classes.input}>
          <ForgotPasswordTextField
            variant='outlined'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            value={email}
            />
        </div>
        <Feedback>{emailValidationError}</Feedback>
        <br/>
        <Button className={classes.button}
                type='submit'
                variant='contained'
                color='primary'
        >
          <Send className='send-reset-code'><span className='ps-2'>Send reset code</span></Send>
        </Button>
        <Row>
          <Col>
            <FormLabel className='col-lg-2'>Email</FormLabel>
            <div className='col-lg-4'>
              <FormControl type='email'
                           value={email}
                           className={emailValidationError ? 'form-control is-invalid' : ''}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              />
            </div>
          </Col>
        </Row>


        <Row>
          <Col>
            <Button type='submit' variant='primary'>
              <i className='fas fa-paper-plane send-reset-code'><span className='ps-2'>Send reset code</span></i>
            </Button>
          </Col>
        </Row>

      </form>
    </div>
  )
}