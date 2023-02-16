import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "./Logo";
import SlideDrawer from "./SlideDrawer";


const Navbar: React.FC = () => {
    return (
        <NavbarContainer>
            <div className="nav-center">
                <div className="nav-header">
                    <Logo />
                    <SlideDrawer />
                    <NavLink to='about'>About</NavLink>
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

    .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

export default Navbar;