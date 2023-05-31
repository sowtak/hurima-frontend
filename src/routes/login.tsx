import { useState } from "react";
import axios from "axios";
import { API_BASE_URL_DEV } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "../components/FormContainer";
import { Button, FormControl, FormErrorMessage, Input, Progress, Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import FormFieldDivider from "../components/FormFieldDivider";
import { isValidEmail } from "../utils/email-validity-checker";

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

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
  });
  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);
  const [googleLoginError, setGoogleLoginError] = useState<boolean>(false);
  const [sendTokenToServerError, setSendTokenToServerError] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleFieldChange =
    (fieldName: keyof LoginFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: event.target.value,
      }));
    };

  const sendAuthToken = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(formData.email)) {
      setEmailIsInvalid(true);
      return;
    }
    setEmailIsInvalid(false);
    try {
      const response = await axios.post(
        API_BASE_URL_DEV + "/auth/email-login",
        formData
      );
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };


  const handleSendTokenError = (): void => {
    setSendTokenToServerError(true); // OAuth2 login successful but some error afterwards
  };

  return (
    <>
      {isLoading && <Progress size="xs" isIndeterminate />}
      <FormContainer formName='Login to Hurima'>
        <form onSubmit={sendAuthToken}>
          <FormControl isInvalid={emailIsInvalid} marginBottom={3}>
            <Input
              placeholder='Email'
              value={formData.email}
              variant='outlined'
              onChange={handleFieldChange("email")}
              margin='dense'
            />
            <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
          </FormControl>
          <Button
            marginBottom={2}
            variant='contained'
            type='submit'
          >
            Send email verification link
          </Button>
          <FormFieldDivider />
        </form>
        {googleLoginError && (
          <Alert status='error'>
            <AlertIcon />
            Failed to log in
          </Alert>
        )}
        {sendTokenToServerError && (
          <Alert
            status='error'
            onAbort={() => setSendTokenToServerError(false)}
          >
            Failed to send token to server
          </Alert>
        )}
      </FormContainer>
    </>
  );
};

export default LoginForm;
