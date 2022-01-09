/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 12:06 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";

export const useLoginStyles = styled('div')(({theme}) => ({
  container: {
    width: 400,
    margin: "0 auto",
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