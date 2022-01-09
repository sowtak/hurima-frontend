/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:55 AM
 * @version 1.0.0
 */
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";

import logo from '../../images/icons/HUrima-logo-purple.svg';
import {logout} from "../../redux/thunks/auth-thunks";

import './NavBar.css';
import {Link} from "react-router-dom";
import {AppBar, Box, Container, Toolbar} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {SearchIconWrapper} from "../SearchBar/SearchBarStyles";
import {Search, StyledInputBase} from "../SearchBar/SearchBarStyles";
import {AppRegistration, Login, Logout, RemoveRedEye} from "@mui/icons-material";

export const NavBar: FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn: boolean = useSelector((state: AppStateType) => state.user.isLoggedIn);
  const username = useSelector((state: AppStateType) => {
    if (isLoggedIn) {
      return state.user.user.username;
    } else return {};
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  let links;
  let signOut;

  if (isLoggedIn || localStorage.getItem("isLoggedIn")) {
    links = (
      <li className='nav-item'>
        <Link to={`/${username}`} className='nav-link pe-3 ps-3 account'>
          <i className='pe-3 ps-3 fas fa-user'/>Account
        </Link>
      </li>
    )
    signOut = (
      <Link to='/' onClick={handleLogout} className='nav-link ps-3 pe-3 signout'>
        <Logout className='pe-3 ps-3'/>Sign out
      </Link>
    );
  } else {
    links = (
      <>
        <li className='nav-item'>
          <Link to='/login' className='nav-link ps-3 pe-3 login'>
            <Login className='ps-3'/>Log in
          </Link>
        </li>
        <li>
          <Link to='/registration' className='nav-link ps-3 pe-3 signup'>
            <AppRegistration className='ps-3'/><span>Sign up</span>
          </Link>
        </li>
      </>
    );
    signOut = null;
  }


  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters={true}>
            <Link to='/'>
              <img src={logo} className='pe-5' alt=""/>
            </Link>

            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search...'
                inputProps={{ 'aria-label': 'search'}}
              />
            </Search>




              <>
                <ul className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link to='/items' className='nav-link pe-3 ps-3 items'>
                      <i className='ps-3 fas fa-box m-lg-auto'/>Items
                    </Link>
                  </li>
                </ul>
                <ul className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link to='/watchlist' className='nav-link pe-3 ps-3 watchlist'>
                      <RemoveRedEye className='ps-3 m-lg-auto'/><span className='fg-white'>Watch</span>
                    </Link>
                  </li>
                  {links}
                </ul>
                {signOut}
              </>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
