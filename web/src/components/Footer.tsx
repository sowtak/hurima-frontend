/**
 * @author  Sowa Takayanagi
 * @since   1/1/2022 2:46 PM
 * @version 1.0.0
 */
import {ElementType, FC} from "react";
import {Link} from "react-router-dom";

import {Box, Container, CssBaseline, Typography} from "@mui/material";
import {Twitter} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

export const FooterContainer: ElementType = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flexDirection: column;
  minHeight: 100vh;
  borderTop: 1px solid #869096;
`

export const FooterBox: ElementType = styled(Box)`
  py: 3;
  px: 2;
  mt: auto;
`

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

const SocialMediaIcons = () => {
    return (
        <Link to={'twitter.com/tkyngs_swe'}>
            <Twitter/>
        </Link>
    )
}

export const Footer: FC = () => {
    return (
        <FooterContainer sx={{borderTop: "1px solid #869096"}}>
            <CssBaseline/>
            <Container component='main' sx={{mt: "8", mb: "2"}} maxWidth="sm">
                <FooterBox component='footer'>
                    <Container maxWidth='sm' sx={{padding: '30px'}}>
                        <Typography variant='body1'>hurima</Typography>
                        <Copyright/>
                        <SocialMediaIcons/>
                    </Container>
                </FooterBox>
            </Container>
        </FooterContainer>
    )
}