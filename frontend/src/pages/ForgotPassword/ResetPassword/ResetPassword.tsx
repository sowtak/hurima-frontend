/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 1:51 PM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../store/rootReducer";
import {forgotPassword} from "../../../store/thunks/auth-thunks";
import {Alert, Box, Button, Typography} from "@mui/material";
import {ForgotPasswordTextField} from "../ForgotPasswordStyles";
import {Feedback, Send} from "@mui/icons-material";

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: AppState) => state.auth.error);
  const success = useSelector((state: AppState) => state.auth.success);
  const loading = useSelector((state: AppState) => state.auth.loading);
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
    <>
      <Typography component={'h1'}>Reset your password</Typography>
      
    </>
  );
}