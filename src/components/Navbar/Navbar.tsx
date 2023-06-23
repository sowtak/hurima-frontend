import { useSelector } from "react-redux";
import { Box, Button, Flex, Spacer, Stack } from "@chakra-ui/react";
import { RootState } from "../../store";
import { Logo } from "./Logo";
import SlideDrawer from "../drawers/SlideDrawer";
import { SignInButton } from "../buttons/SignInButton";
import ProfileIcon from "../icons/ProfileIcon";

const Navbar = () => {
  const envi = process.env.NODE_ENV;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Stack
      as="nav"
      borderBottom="1px solid #ccc"
      justifyContent="space-between"
      w="100%"
      mx="auto"
    >
      <Flex align="center">
        <Logo />
        <Spacer/>
        <Flex align="center" ml={4} gap="4">
          <SignInButton />
          <ProfileIcon />
          <SlideDrawer />
        </Flex>
      </Flex>
    </Stack>
  );
};

export default Navbar;
