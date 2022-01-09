/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 1:50 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";

export const ForgotPasswordTextField = styled('div')(({theme}) =>({
  root: {
    '& .MuiOutlinedInput-root': {
      width: 400,
      height: 40,
      borderRadius: 30,
      border: '1px solid',
      padding: 0,
      paddingLeft: 15,
    }
  }
}))(TextField);