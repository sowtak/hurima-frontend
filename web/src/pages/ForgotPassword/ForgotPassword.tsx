/**
 * @author  Sowa Takayanagi
 * @since   1/15/2022 2:12 PM
 * @version 1.0.0
 */
import {ChangeEvent, ElementType, FC, FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthenticationService} from "../../service/api/authenticationService";
import {Button, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";


export const ForgotPasswordContainer: ElementType = styled('div')`
  width: 500px;
  margin: 0px auto;
  fontFamily: "Helvetica Neue", Helvetica, Arial, sans-serif;
  & a: {
   textDecoration: none;
  }
`;

export const ForgotPasswordTextField: ElementType = styled(TextField)`
  width: 340px;
  height: 56px;
  border: 1px solid;
  paddingLeft: 15px;
`;

export const PasswordResetButton: ElementType = styled(Button)`
  height: 50px;
  width: 340px;
  
  % .MuiButton-label: {
    fontSize: 13;
  }
`;

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendResetCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    AuthenticationService.sendPasswordResetCode({email: email})
      .then(() => {
        navigate('/account/forgot-password/')
      }).catch((error) => console.log(error));
  }

  return (
    <ForgotPasswordContainer sx={{padding: '24px'}}>
      <form onSubmit={sendResetCode}>
        <h1>Send password reset code</h1>
        <ForgotPasswordTextField
          label='Your email address'
          type='email'
          variant='filled'
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />
        <PasswordResetButton
          sx={{padding: '12px'}}
          type='submit'
          variant='contained'
          color='primary'
          disabled={!(email)}
        >
          Send reset code
        </PasswordResetButton>
        <Link to='/account/forgot-password/find-email'>
          <Typography sx={{paddingTop: '24px'}}>
            Forgot email?
          </Typography>
        </Link>

      </form>
    </ForgotPasswordContainer>
  );
}