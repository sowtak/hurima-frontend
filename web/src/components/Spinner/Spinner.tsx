/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 4:27 PM
 * @version 1.0.0
 */
import {FC} from "react";
import {CircularProgress} from "@mui/material";

export const Spinner: FC = () => {
  return (
    <div>
      <CircularProgress/>
    </div>
  )
};