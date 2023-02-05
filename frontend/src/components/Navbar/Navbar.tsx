import styled from "styled-components";
import { Logo } from "./Logo";


const Navbar: React.FC = () => {
    return (
        <NavbarContainer>
            <div className="nav-center">
                <div className="nav-header">
                    <Logo/>
                </div>
            </div>
        </NavbarContainer>
    )
}

const NavbarContainer = styled.nav`
    height: 5rem;
    display: flex;
`

export default Navbar;