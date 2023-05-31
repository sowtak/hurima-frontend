import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box borderTop="1px solid #ccc" bgColor="#f5f5f5">
      <Flex justify="space-between" alignItems="center" p={4}>
        <Flex as="nav" className="footer-nav">
          <Flex as="ul">
            <NavLink to="about" color="black">
              <Text>About</Text>
            </NavLink>
          </Flex>
          <Flex as="ul">
            <NavLink to="privacy-policy" color="black">
              <Text>Privacy policy</Text>
            </NavLink>
          </Flex>
          <Flex as="ul">
            <NavLink to="terms-of-service" color="black">
              <Text>Terms of Service</Text>
            </NavLink>
          </Flex>
        </Flex>

        <Flex className="footer-content" alignItems="center">
          <Text>
            &copy; {new Date().getFullYear()} <Box color="blue.500">Hurima</Box>
          </Text>
          <Text>All rights reserved</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;

