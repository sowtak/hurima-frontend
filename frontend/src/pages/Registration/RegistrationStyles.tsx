/**
 * @author  Sowa Takayanagi
 * @since   1/11/2022 3:22 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {InputLabel} from "@mui/material";

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