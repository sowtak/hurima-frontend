import {styled} from "@mui/material/styles";
import {alpha, AppBar, InputBase} from "@mui/material";

/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 9:42 AM
 * @version 1.0.0
 */

export const AppLogo = styled('img')`
  &:hover {
    cursor: pointer;
  }
`;

export const Navbar = styled(AppBar)`
    position: static;
    fontWeight: bold;
    borderBottom: "0px solid #e1e8ed";
    boxShadow: "0 0 3px #aaa";
`