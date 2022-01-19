/**
 * @author  Sowa Takayanagi
 * @since   1/11/2022 2:02 PM
 * @version 1.0.0
 */
import {ChangeEvent, ElementType, FC, FormEvent, ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthenticationService} from "../../../service/api/authenticationService";
import {API_BASE_URL_DEV} from "../../../utils/constants/url";
import {Box, Button, Container, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";


export const FindEmailTextField: ElementType = styled('div')`
  width: 500px;
  margin: 0px auto;
  fontFamily: "Helvetica Neue", Helvetica, Arial, sans-serif;
  & a: {
   textDecoration: none;
  }
`;

export const FindEmailContainer: ElementType = styled(Container)`
  width: 340px;
  margin: 0px auto;
`;

export const FindEmailButton: ElementType = styled(Button)`
  height: 40px;
  width: 340px;
`;

export const Message: ElementType = styled(Typography)`
  margin: 14px 0px;
  fontSize: 15px;
`;

export const Warning: ElementType = styled(Typography)`
  color: #c33;
  fontSize: 15px;
`;

export const FindEmail: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const findExistingEmail = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    AuthenticationService.findExistingEmail({email: email})
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
    <FindEmailContainer>
      <h1>Find your email</h1>
      <form onSubmit={findExistingEmail}>
        <Box sx={{marginBottom: '24px'}}>
          <FindEmailTextField
            label='Your email'
            variant='outlined'
            onChange={handleChangeEmail}
            type='email'
            value={email}
          />
        </Box>

        {error &&
          <>
            <Warning>We couldn't find your account with that information</Warning>
            <Message>Please try searching with another email</Message>
          </>
        }

        <Box sx={{marginBottom: '24px'}}>
          <FindEmailButton
            type='submit'
            variant='contained'
            color='primary'
          >
            Find email
          </FindEmailButton>
        </Box>
      </form>
    </FindEmailContainer>
  )
}