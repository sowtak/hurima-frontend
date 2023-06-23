import { useState } from "react";
import { Box, Button, Flex, Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdPerson2 } from "react-icons/md"
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (menuItem: any) => {
    // Handle menu item click here
    console.log(`Clicked ${menuItem}`);
  };

  return (
    <Menu isLazy>
      <MenuButton
        borderRadius="50%"
        as={Button}
        onClick={handleMenuToggle}
      >
        <Icon as={MdPerson2} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleMenuItemClick("Profile")}>
          <Link to="profile">
            View Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Settings")}>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Logout")}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileIcon;
