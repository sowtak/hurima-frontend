/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:55 AM
 * @version 1.0.0
 */
import {ElementType, FC} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppState} from "../store/rootReducer"

import logo from '../images/icons/flema-logo-svg-25100.svg'
import {logOut} from "../store/ducks/user/thunks"

import {Link, useNavigate} from "react-router-dom"
import {AppBar, Box, Button, Stack, Toolbar, Typography} from "@mui/material"
import {SearchBar} from "./SearchBar"
import {styled} from "@mui/material/styles"
import {AppLogo} from "./Logo";


export const Navbar: ElementType = styled(AppBar)`
  height: 80;
  display: flex;
  position: static;
  fontWeight: bold;
`

export const NavBar: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn: boolean = useSelector((state: AppState) => state.user.isLoggedIn)
    const username = useSelector((state: AppState) => {
        if (isLoggedIn) {
            return state.user.user.username
        } else return {}
    })

    const handleLogout = () => {
        dispatch(logOut(navigate))
    }

    let links, signOut

    if (isLoggedIn || localStorage.getItem("isLoggedIn")) {
        links = (
            <Stack direction='row'>
                <Link to={`/${username}`}>
                    <Typography sx={{fontWeight: 'bold'}}>Account</Typography>
                </Link>
            </Stack>
        )
        signOut = (
            <Stack direction='row' spacing={3}>
                <Link to='/' onClick={handleLogout}>
                    <span><Typography sx={{whiteSpace: 'nowrap', fontWeight: 'bold'}}>Sign out</Typography></span>
                </Link>
            </Stack>
        );
    } else {
        links = (
            <Stack direction='row' spacing={3}>
                <Link to='/account/signin'>
                    <span><Typography sx={{whiteSpace: 'nowrap', fontWeight: 'bold'}}>Sign in</Typography></span>
                </Link>
                <Link to='/account/signup'>
                    <Typography sx={{whiteSpace: 'nowrap', fontWeight: 'bold'}}><span>Sign up</span></Typography>
                </Link>
            </Stack>
        )
        signOut = null
    }


    return (
        <Box sx={{borderBottom: "1px solid #869096"}}>
            <Navbar color='transparent' variant='dense' style={{padding: "5px 20px"}}>
                <Toolbar disableGutters={true}>
                    <Link to='/'>
                        <AppLogo src={logo} alt="logo"/>
                    </Link>

                    <SearchBar/>

                    <Stack direction='row' spacing={4}>
                        <Link to='/watchlist'>
                            <Typography sx={{fontWeight: 'bold'}}>Watch</Typography>
                        </Link>
                        {links}
                        {signOut}
                        <Link to='/list-an-item'>
                            <Button variant={'contained'} size={'small'}>
                                List an item
                            </Button>
                        </Link>
                    </Stack>
                </Toolbar>
            </Navbar>
        </Box>
    )
}
