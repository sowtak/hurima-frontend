/**
 * @author  Sowa Takayanagi
 * @since   1/11/2022 2:03 PM
 * @version 1.0.0
 */
import {styled} from "@mui/material/styles";
import {Button, Typography} from "@mui/material";
import {ElementType} from "react";

export const FindEmailButton: ElementType = styled(Button)`
  padding: 5 18;
  marginTop: 20;
  display: block;
`;

export const Message: ElementType = styled(Typography)`
  margin: 14 0;
  fontSize: 15;
`;

export const Warning: ElementType = styled(Typography)`
  fontSize: 28;
  color: #c44;
`;