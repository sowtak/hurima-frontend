import {styled} from "@mui/material/styles";
import {alpha, AppBar, InputBase} from "@mui/material";
import {ElementType} from "react";

/**
 * @author  Sowa Takayanagi
 * @since   1/9/2022 9:42 AM
 * @version 1.0.0
 */

export const AppLogo: ElementType = styled('img')`
  paddingRight: 10;
  &:hover {
    cursor: pointer;
  }
`;

export const Navbar: ElementType = styled(AppBar)`
  height: 80;
  display: flex;
  position: static;
  fontWeight: bold;
`;