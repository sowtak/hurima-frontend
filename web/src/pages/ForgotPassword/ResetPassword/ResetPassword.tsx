/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 1:51 PM
 * @version 1.0.0
 */
import {ChangeEvent, ElementType, FC, FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../store/rootReducer";
import {forgotPassword} from "../../../store/ducks/user/thunks";
import {Button, Container, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

export const ResetPasswordContainer: ElementType = styled(Container)`
  width: 340px;
  margin: 0px auto;
`;

export const ResetPasswordButton = styled(Button)`
  height: 40;
  width: 340px;
  
  % .MuiButton-label: {
    fontSize: 13;
  }
`;

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
    <ResetPasswordContainer>
      <Typography component={'h1'}>Reset your password</Typography>

      <ResetPasswordButton
        type='submit'
      >
        Reset
      </ResetPasswordButton>
    </ResetPasswordContainer>
  );
}