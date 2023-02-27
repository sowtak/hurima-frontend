import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store";
import { Logo } from "./Logo";
import SlideDrawer from "./SlideDrawer";

const Navbar: React.FC = () => {
  const envi = process.env.NODE_ENV;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <NavbarContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Logo />
          <ul>
            <ul>
              <SlideDrawer />
            </ul>
            <ul>
              {isAuthenticated ? (
                <NavLink
                  to='profile'
                  style={{ textDecoration: "none" }}
                  color={"black"}
                >
                  Profile
                </NavLink>
              ) : (
                <NavLink
                  to='login'
                  style={{ textDecoration: "none" }}
                  color={"black"}
                >
                  Log in
                </NavLink>
              )}
            </ul>
            {envi === "development" ? (
              <ul>
                <NavLink
                  to='local-login'
                  style={{ textDecoration: "none" }}
                  color={"black"}
                >
                  Local log in
                </NavLink>
              </ul>
            ) : null}
          </ul>
        </div>
      </div>
    </NavbarContainer>
  );
};

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
`;

export default Navbar;
