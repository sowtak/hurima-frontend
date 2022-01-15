/**
 * @author  Sowa Takayanagi
 * @since   1/11/2022 3:22 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {Button, Container, DialogContent, FormControl, InputLabel, TextField, Typography} from "@mui/material";
import {ElementType} from "react";

export const RegistrationTextField: ElementType = styled(TextField)`
  width: 340px;
  height: 60px;
  paddingBottom: 24px;
  border: '1px solid #e2e2e1';
  overflow: 'hidden';
  borderRadius: 4;
`;

export const RegistrationFormContainer: ElementType = styled(Container)`
  width: 340px;
  margin: 0px auto;
`;

export const InputContent: ElementType = styled('div')`
  fontSize: 3;
  float: right;
  display: flex;
  marginTop: -9;
  marginRight: 20;
`;

export const InputCount: ElementType = styled('div')`
  display: inline;
  & .MuiInputLabel-formControl: {
    position: relative;
  }
`;

export const RegistrationInputLabel: ElementType = styled(InputLabel)`
  marginTop: -5;
  fontSize: 12;
`;

export const RegistrationDialogContent: ElementType = styled(DialogContent)`
  padding: 0 30;
  marginTop: 5;
  width: 600;
  minHeight: 600;
`;

export const Title: ElementType = styled(Typography)`
  fontWeight: 700;
  fontSize: 21;
  marginTop: 20;
  marginBottom: 28;
  lineHeight: 28;
`;

export const RegistrationFormControl: ElementType = styled(FormControl)`
  display: flex;
  justifyContent: space-between;
`;

export const RegistrationSubmitButton: ElementType = styled(Button)`
  height: 50px;
  width: 340px;
  
  % .MuiButton-label: {
    fontSize: 13;
  }
`;
