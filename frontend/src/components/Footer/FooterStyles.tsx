/**
 * @author  Sowa Takayanagi
 * @since   1/15/2022 10:14 AM
 * @version 1.0.0
 */
import {ElementType} from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

export const FooterContainer: ElementType = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flexDirection: column;
  minHeight: 100vh;
  borderTop: 1px solid #869096;
`;

export const FooterBox: ElementType = styled(Box)`
  py: 3;
  px: 2;
  mt: auto;
`;

