/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 4:27 PM
 * @version 1.0.0
 */
import {FC} from "react"
import {CircularProgress, LinearProgress} from "@mui/material"

export const Progress: FC = () => {
  return (
    <div>
      <LinearProgress sx={{zIndex: '1', display: 'flex', justifyContent: 'center'}}/>
    </div>
  )
}