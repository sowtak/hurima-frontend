/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:55 AM
 * @version 1.0.0
 */
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {LinkContainer} from 'react-router-bootstrap';

import logo from '../../images/icons/HUrima-logo-purple.svg';
import {logout} from "../../redux/thunks/auth-thunks";
import {Container, Nav, Navbar} from "react-bootstrap";

import './NavBar.css';
import {Link} from "react-router-dom";
import {SearchBar} from "../SearchBar/SearchBar";
import {AppPropsType} from "../../types/types";

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
        <i className='pe-3 ps-3 fas fa-sign-out-alt'/>Sign out
      </Link>
    );
  } else {
    links = (
      <>
        <li className='nav-item'>
          <Link to='/login' className='nav-link ps-3 pe-3 login'>
            <i className='ps-3 fas fa-sign-in-alt'/>Log in
          </Link>
        </li>
        <li>
          <Link to='/registration' className='nav-link ps-3 pe-3 signup'>
            <i className='ps-3 fa fa-user-plus'/><span>Sign up</span>
          </Link>
        </li>
      </>
    );
    signOut = null;
  }


  return (
    <>
      <Navbar className='navbar navbar-expand-lg navbar-dark hurima-navbar' collapseOnSelect>
        <div className='container container-fluid hurima-logo'>

          <LinkContainer to='/'>
            <img src={logo} className='pe-5' alt=""/>
          </LinkContainer>

          <SearchBar data={} searchByData={} setFilteredData={} setSearching={}/>

          <Nav className='navbar-nav ml-auto'>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
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
                      <i className='ps-3 fas fa-eye m-lg-auto'/>Watch
                    </Link>
                  </li>
                  {links}
                </ul>
                {signOut}
              </>

            </Navbar.Collapse>
          </Nav>
        </div>
      </Navbar>
    </>
  )
    ;
};
