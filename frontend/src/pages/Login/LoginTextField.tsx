/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 12:29 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {createStyles, OutlinedInputProps, TextField, TextFieldProps} from "@mui/material";

export const useLoginTextFieldStyles = styled('div')(({theme}) => ({
  root: {
    width: 400,
    height: 60,
  },
  focused: {}
}));

export const LoginTextField = (props: TextFieldProps) => {
  const classes = useLoginTextFieldStyles();

  return (
    <TextField
      InputProps={{classes, disableUnderline: true} as Partial<OutlinedInputProps>}
      {...props}
    />
  );
}