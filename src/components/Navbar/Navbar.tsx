import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store";
import { Logo } from "./Logo";
import SlideDrawer from "./SlideDrawer";


const Navbar: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    return (
        <NavbarContainer>
            <div className="nav-center">
                <div className="nav-header">
                    <Logo />
                    <SlideDrawer />
                    <NavLink to='about'>About</NavLink>
                    {isAuthenticated ? (
                        <NavLink to='login'>Login</NavLink>
                    ) : (
                        <NavLink to='profile'>Profile</NavLink>
                    )}
                </div>
            </div>
        </NavbarContainer>
    )
}

const NavbarContainer = styled.nav`
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .nav-center {
        width: 90vw;
        margin: 0 auto;
        max-width: var(--max-width);
    }

    .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

export default Navbar;