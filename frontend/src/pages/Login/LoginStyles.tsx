/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 12:06 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {Button, Container, TextField, Typography} from "@mui/material";
import {ElementType} from "react";

export const LoginFormContainer: ElementType = styled(Container)`
  width: 340px;
  margin: 0px auto;
`;

export const LoginSubmitButton: ElementType = styled(Button)`
  height: 50px;
  width: 340px;
  
  % .MuiButton-label: {
    fontSize: 13;
  }
`;

export const LoginFormError: ElementType = styled(Typography)`
  padding: 12px 16px;
  borderRadius: 12;
  marginBottom: 12;
  fontSize: 15;
  fontWeight: 400;
  backgroundColor: rgb(255, 210, 218);
`;

export const LoginInputField: ElementType = styled(TextField)`
  height: 60px;
  width: 340px;
  border: 1px solid #f1f1e9;
  overflow: hidden;
  borderRadius: 12px;
`;
