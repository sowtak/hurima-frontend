/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 11:55 AM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";

export const useForgotPasswordStyles = styled('div')(({theme}) => ({
  container: {
    fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
    "& a": {
      textDecoration: "none",
    }
  },
  error: {
    padding: "15px 15px",
    borderRadius: 15,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 400,
    backgroundColor: "rgb(255, 224, 224)"
  },
  input: {
    marginBottom: 25
  },
  button: {
    height: 50,
    "& .button-label": {
      fontSize: 15
    }
  },
}));