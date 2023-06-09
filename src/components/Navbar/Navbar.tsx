import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import { RootState } from "../../store";
import { Logo } from "./Logo";
import SlideDrawer from "./SlideDrawer";

const Navbar = () => {
  const envi = process.env.NODE_ENV;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Flex
      as="nav"
      borderBottom="1px solid #ccc"
      align="center"
      justify="center"
      w="90vw"
      mx="auto"
      maxW="var(--max-width)"
      className="nav-center"
    >
      <Flex align="center" justify="space-between" className="nav-header">
        <Logo />
        <Flex as="ul">
          <SlideDrawer />
          <Box as="ul">
            {isAuthenticated ? (
              <NavLink to="profile" style={{ textDecoration: "none" }} color="black">
                Profile
              </NavLink>
            ) : (
              <NavLink to="login" style={{ textDecoration: "none" }} color="black">
                <Button colorScheme="purple" size="md" variant="solid">
                  Sign in
                </Button>
              </NavLink>
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
