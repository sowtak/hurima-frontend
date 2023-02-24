import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL_DEV } from '../utils/constants';
import { useNavigate } from 'react-router';
import { FormContainer } from '../components/FormContainer';
import { Alert, Button, LinearProgress, Snackbar, TextField } from '@mui/material';
import { GoogleLogin, TokenResponse } from '@react-oauth/google';
import FormFieldDivider from '../components/FormFieldDivider';
import { isValidEmail } from '../utils/email-validity-checker';

type LoginFormData = {
  email: string;
};

interface IUserInfoResponse {
    id: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
}

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
  });
  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false)
  const [googleLoginError, setGoogleLoginError] = useState<boolean>(false)
  const [sendTokenToServerError, setSendTokenToServerError] = useState<boolean>(false) 
  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(null)

  const navigate = useNavigate();

  const handleFieldChange = (fieldName: keyof LoginFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: event.target.value,
    }));
  };


  const sendAuthToken = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(formData.email)) {
      setEmailIsInvalid(true)
      return
    }
    console.log("error")
    setEmailIsInvalid(false)
    try {
      const response = await axios.post(API_BASE_URL_DEV + '/auth/email-login', formData);
      if (response.status === 200) {
        navigate('/profile')
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // Send auth_token to server.
  const handleGoogleLoginSuccess = async (response: any) => {
    const idToken = response.tokenId;
    try {
      const res = await axios.post(API_BASE_URL_DEV + "/auth/google-login", { idToken });
    } catch (error) {
      setGoogleLoginError(true);
    }
  };

  const handleSendTokenError = () : void => {
    setSendTokenToServerError(true) // OAuth2 login successful but some error afterwards
  };

  return (
    <>
      {isLoading && <LinearProgress/>}
      <FormContainer formName='Login to Hurima'>
        <form onSubmit={sendAuthToken}>
          <TextField
            fullWidth
            sx={{marginBottom: 3}}
            label="Email"
            value={formData.email}
            error={emailIsInvalid}
            helperText={emailIsInvalid ? 'Please enter a valid email address' : ''}
            variant="outlined"
            onChange={handleFieldChange("email")}
            margin="dense"
          />
          <Button
            sx={{marginBottom: 2}}
            variant="contained"
            fullWidth
            type='submit'
          >
              Send Email Verification Link
          </Button>
          <FormFieldDivider/>
          <GoogleLogin
            text="signin_with"
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setGoogleLoginError(true)}
            state_cookie_domain={"single_host_origin"}
          />
        </form>
        {googleLoginError && (
          <Alert severity="error">
            {"Failed to log in"}
          </Alert>
        )}
          {sendTokenToServerError && (
        <Snackbar open={sendTokenToServerError} autoHideDuration={6000} onClose={() => setSendTokenToServerError(false)}>
          <Alert severity="error" onClose={() => setSendTokenToServerError(false)}>
            {"Failed to send token to server"}
          </Alert>
        </Snackbar>
      )}
      </FormContainer>
    </>
  );
};

export default RegistrationForm;