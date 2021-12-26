/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:55 AM
 * @version 1.0.0
 */
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";

import logo from '../../images/icons/logo.png';
import {logout} from "../../redux/thunks/auth-thunks";
import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

export const NavBar: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector((state: AppStateType) => state.user.isLoggedIn);
    const user = useSelector((state: AppStateType) => {
        if (isLoggedIn) {
            return state.user.user;
        }
        return {};
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
                        <Image width='160px'
                               height='auto'
                               className='HUrima-logo'
                               src={logo} alt='logo'/>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='navbar-nav ml-auto'>
                            <LinkContainer to='watchlist'>
                                <Nav.Link>
                                    <i className='p-1 fas fa-eye'/>
                                </Nav.Link>
                            </LinkContainer>
                            {user !== {} ? (
                                <NavDropdown title={user.username} id='username'>
                                    <LinkContainer to="/account">
                                        <NavDropdown.Item>プロフィール</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>ログアウト</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link href='/login'>
                                        <i className='p-1 fas fa-user'/>ログイン
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
