/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 12:06 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {Button, Container, TextField, Typography} from "@mui/material";
import {ElementType} from "react";

export const LoginFormContainer: ElementType = styled(Container)`
  width: 340;
  margin: 0 auto;
`;

export const LoginSubmitButton: ElementType = styled(Button)`
  height: 50;
  
  % .MuiButton-label: {
    fontSize: 13;
  }
`;

export const LoginFormError: ElementType = styled(Typography)`
  padding: 12 16;
  borderRadius: 12;
  marginBottom: 12;
  fontSize: 15;
  fontWeight: 400;
  backgroundColor: rgb(255, 210, 218);
`;

export const LoginInputField: ElementType = styled(TextField)`
  height: 60;
  width: 340;
  border: 1px solid #f1f1e9;
  overflow: hidden;
  borderRadius: 4;
`;
