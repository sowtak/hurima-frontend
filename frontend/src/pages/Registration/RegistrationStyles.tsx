/**
 * @author  Sowa Takayanagi
 * @since   1/11/2022 3:22 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {DialogContent, FormControl, InputLabel, Typography} from "@mui/material";

export const InputContainer = styled('div')`
  marginBottom: 20;
`;

export const InputContent = styled('div')`
  fontSize: 3;
  float: right;
  display: flex;
  marginTop: -9;
  marginRight: 20;
`;

export const InputCount = styled('div')`
  display: inline;
  & .MuiInputLabel-formControl: {
    position: relative;
  }
`;

export const RegistrationInputLabel = styled(InputLabel)`
  marginTop: -5;
  fontSize: 12;
`;

export const RegistrationDialogContent = styled(DialogContent)`
  padding: 0 30;
  marginTop: 5;
  width: 600;
  minHeight: 600;
`;

export const Title = styled(Typography)`
  fontWeight: 700;
  fontSize: 21;
  marginTop: 20;
  marginBottom: 28;
  lineHeight: 28;
`;

export const RegistrationFormControl = styled(FormControl)`
  display: flex;
  justifyContent: space-between;
`;