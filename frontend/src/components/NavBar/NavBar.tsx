/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:55 AM
 * @version 1.0.0
 */
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {AppStateType} from "../../redux/reducers/root-reducer";

import logo from '../../images/icons/logo.png';
import {logout} from "../../redux/thunks/auth-thunks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

export const NavBar: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector((state: AppStateType) => state.user.isLoggedIn);

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
                               className='image-responsive'
                               src={logo} alt='logo'/>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='navbar-nav ml-auto'>
                            {(isLoggedIn || localStorage.getItem("isLoggedIn")) ?
                                <div>
                                    <LinkContainer to="/account">
                                        <Nav.Link>
                                            <FontAwesomeIcon className="mr-3" icon={faUser}/>アカウント
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/" onClick={handleLogout}>
                                        <FontAwesomeIcon className="mr-3" icon={faUser}/>アカウント
                                    </LinkContainer>
                                </div>
                                :
                                <>
                                    <div>
                                        <LinkContainer to="/login">
                                            <i className="p-1 fas fa-user"/>ログイン
                                        </LinkContainer>
                                        <LinkContainer to="/registration">
                                            <FontAwesomeIcon className="mr-3" icon={faUserPlus}/>新規登録
                                        </LinkContainer>
                                    </div>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
