/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:55 AM
 * @version 1.0.0
 */
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {LinkContainer} from 'react-router-bootstrap';

import logo from '../../images/icons/logo.png';
import logo2 from '../../images/icons/HUrima-logo-purple.svg';
import {logout} from "../../redux/thunks/auth-thunks";
import {Button, Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";

import './NavBar.css';

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

    return (
        <header>
            <Navbar
                style={{
                    background: 'rgba(0,0,0,1)',
                    border: '0',
                    color: '#00000'
                }}
                className='navbar navbar-expand-lg navbar-dark'
                collapseOnSelect
            >
                <Container>
                    <LinkContainer to='/'>
                        <img src={logo2} alt=""/>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='navbar-nav ml-auto'>
                            <LinkContainer to='/watchlist'>
                                <Nav.Link className='watch-list'>
                                    <i className='p-1 fas fa-eye'/><span>ウォッチ</span>
                                </Nav.Link>
                            </LinkContainer>
                            { isLoggedIn || localStorage.getItem("isLoggedIn") ? (
                                <NavDropdown title={user.username} id='username'>
                                    <LinkContainer to="/account">
                                        <NavDropdown.Item>プロフィール</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>ログアウト</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className='login'>
                                        <i className='p-1 fas fa-user'/><span>ログイン</span>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
