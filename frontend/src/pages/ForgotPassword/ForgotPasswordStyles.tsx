/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 11:55 AM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";

export const ForgotPasswordContainer = styled('div')`
  fontFamily: "Helvetica Neue", Helvetica, Arial, sans-serif;
  & a: {
   textDecoration: none;
  }
`;

export const ForgotPasswordTextField = styled(TextField)`
    & .MuiOutlinedInput-root: {
      width: 400;
      height: 40;
      borderRadius: 30;
      border: '1px solid';
      padding: 0;
      paddingLeft: 15;
    }
`;