/**
 * @author  Sowa Takayanagi
 * @since   1/11/2022 2:02 PM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, ReactElement, useState} from "react";
import {FindEmailButton, Message, Warning} from "./FindEmailStyles";
import {useNavigate} from "react-router-dom";
import {AuthenticationService} from "../../../service/api/authenticationService";
import {API_BASE_URL_DEV} from "../../../utils/constants/url";
import {Typography} from "@mui/material";
import {ForgotPasswordTextField} from "../ForgotPasswordStyles";

export const FindEmail: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const findExistingEmail = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    AuthenticationService.post(API_BASE_URL_DEV + "/auth/forgot-password", {email})
      .then(() => {
        setError(false);
        navigate("/account/forgot-password/send-password-reset-code", {state: email});
      }).catch(() => setError(true));
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget) {
      setEmail(event.currentTarget.value);
    }
  };

  return(
    <>
      {error ? (
        <>
          <Warning>We couldn't find your account with that information</Warning>
          <Message>Please try searching with another email</Message>
        </>
        ): (
          <>
            <Typography component={'h1'}>Find your account</Typography>
            <Message>Enter your email</Message>
          </>
      )}
      <form onSubmit={findExistingEmail}>
        <ForgotPasswordTextField
          variant='outlined'
          onChange={handleChangeEmail}
          type='email'
          value={email}
          />
        <FindEmailButton
          type='submit'
          variant='contained'
          color='primary'
        >

        </FindEmailButton>
      </form>
    </>
  )
}