import { useState } from 'react';
import { Box, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const SlideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <Box marginRight={8}>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open drawer"
        onClick={toggleDrawer}
      />

      <Drawer isOpen={isOpen} onClose={toggleDrawer} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack>
              <Link to="login">
                Sign in
              </Link>
              <Link to="terms-of-service" onClick={handleOptionClick}>
                Terms of Service
              </Link>
              <Link to="privacy-policy" onClick={handleOptionClick}>
                Privacy Policy
              </Link>
              <Link to="about" onClick={handleOptionClick}>
                About
              </Link>

            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SlideDrawer;
