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

export const NavBar: FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn: boolean = useSelector((state: AppStateType) => state.user.isLoggedIn);
  const user = useSelector((state: AppStateType) => {
    if (isLoggedIn) {
      return state.user.user;
    } else return {};
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  let links;
  let signOut;

  if (localStorage.getItem("isLoggedIn") || isLoggedIn) {
    links = (
      <li className='nav-item'>
        <Link to='account' className='nav-link'>
          <span className='nav-link p-5'><i className='fas fa-sign-in-alt'/> </span>
        </Link>
      </li>
    );
    signOut = (
      <Link to='/' onClick={handleLogout} className='nav-link ps-5 pe-3 signout'>
        <i className='fa-sign-out-alt'/>Sign Out
      </Link>
    );
  } else {
    links = (
      <>
        <li className='nav-item'>
          <Link to='/login' className='nav-link ps-5 pe-3 login'>
            <i className='fas fa-sign-in-alt'/>Log in
          </Link>
        </li>
        <li>
          <Link to='/registration' className='nav-link signup'>
            <i className='fa fa-user-plus'/><span>Sign up</span>
          </Link>
        </li>
      </>
    );
    signOut = null;
  }


  return (
    <>
      <Navbar className='navbar navbar-expand-lg navbar-dark hurima-navbar' collapseOnSelect>
        <Container className='container-fluid hurima-logo'>
          <LinkContainer to='/'>
            <img src={logo} className='pe-5' alt=""/>
          </LinkContainer>
          <Nav className='navbar-nav ml-auto'>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
              <>
                <ul className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link to='/items' className='nav-link items'>
                      <i className='pe-5 fas fa-box m-lg-auto'/><span>Items</span>
                    </Link>
                  </li>
                </ul>
                <ul className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link to='/watchlist' className='nav-link watchlist'>
                      <i className='pe-5 fas fa-eye m-lg-auto'/><span>Watch</span>
                    </Link>
                  </li>
                  {links}
                </ul>
                {signOut}
              </>

            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
    ;
};
