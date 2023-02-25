import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store";
import { Logo } from "./Logo";
import SlideDrawer from "./SlideDrawer";


const Navbar: React.FC = () => {
    //const isDevMode = 
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    return (
        <NavbarContainer>
            <div className="nav-center">
                <div className="nav-header">
                    <Logo />
                    <ul>
                        <ul>
                            <SlideDrawer />
                        </ul>
                        <ul>
                            <Link href='about' underline="none" color={'black'}>About</Link>
                        </ul>
                        <ul>
                            {isAuthenticated ? (
                                <Link href='profile' underline="none" color={"black"}>Profile</Link>
                            ) : (
                                <Link href='login' underline="none" color={"black"}>Log in</Link>
                            )}
                        </ul>
                    </ul>
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
    border-bottom: 1px solid #ccc;

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

    ul {
        display: inline-block;
    }
`

export default Navbar;