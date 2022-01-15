/**
 * @author  Sowa Takayanagi
 * @since   1/1/2022 2:46 PM
 * @version 1.0.0
 */
import {FC} from "react";
import {Link} from "react-router-dom";

import {Container, CssBaseline, Typography} from "@mui/material";
import {FooterBox, FooterContainer} from "./FooterStyles";
import {Twitter} from "@mui/icons-material";

const Copyright = () => {
  return (
    <Typography variant='body2' color='text.secondary'>
      Copyright © tkyngs
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export const Footer: FC = () => {
  return (
    <FooterContainer sx={{borderTop: "1px solid #869096"}}>
      <CssBaseline/>
      <Container component='main' sx={{mt: "8" ,mb: "2"}} maxWidth="sm">
        <FooterBox component='footer'>
          <Container maxWidth='sm' sx={{padding: '30px'}}>
            <Typography variant='body1'>HUrima</Typography>
            <Copyright/>
            <Link to='https://twitter.com/tkyngs_swe'>
              <Twitter/>
            </Link>
          </Container>
        </FooterBox>
      </Container>
    </FooterContainer>
  )
}