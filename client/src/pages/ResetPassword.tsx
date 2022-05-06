/**
 * @author  Sowa Takayanagi
 * @since   1/27/2022 6:42 AM
 * @version 1.0.0
 */
import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  FormButton,
  FormContainer,
  FormTextField,
} from "../components/FormStyles";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../service/api/authenticationService";
import { useLocation } from "react-router";
import { validateUsername } from "../utils/inputValidators";
import { resetPassword, sendResetCode } from "../store/ducks/user/thunks";
import { useDispatch } from "react-redux";

export type ResetPasswordProps = {
  password: string;
};

export const ResetPassword: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [loginUri, setLoginUri] = useState<URL | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const postData: ResetPasswordProps = { password: password };
    dispatch(resetPassword(postData));
  };

  const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.currentTarget.value);
  };

  const handlePassword2Change = (ev: ChangeEvent<HTMLInputElement>) => {
    setPassword2(ev.currentTarget.value);
    if (password !== null && password !== password2) {
      setPasswordsDoNotMatch(true);
    }
  };

  return (
    <FormContainer>
      <Typography component={"h2"} sx={{ marginBottom: "24px" }}>
        Welcome to fleabay!
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box>
          <FormTextField
            label={"New password"}
            type={"password"}
            variant={"outlined"}
            value={password}
            onChange={handlePasswordChange}
            autoFocus
          />
        </Box>
        <br />
        <Box>
          <FormTextField
            label={"New password (Confirm)"}
            type={"password"}
            variant={"outlined"}
            value={password2}
            onChange={handlePassword2Change}
          />
        </Box>

        <Box>
          <FormButton
            sx={{ marginTop: "24px" }}
            type={"submit"}
            variant={"contained"}
            color={"success"}
          >
            Create account
          </FormButton>
        </Box>
      </form>
    </FormContainer>
  );
};
