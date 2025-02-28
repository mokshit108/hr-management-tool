// src/components/Header.js
import {
    Box,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';
  import { FaBell, FaSearch, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
  
  const Header = () => {
    return (
      <Flex
        as="header"
        align="center"
        justify="space-between"
        py={4}
        px={6}
        bg="white"
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <InputGroup maxW="400px" display={{ base: 'none', md: 'block' }}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search..." />
        </InputGroup>
  
        <Flex align="center" gap={4}>
          <IconButton
            icon={<FaBell />}
            variant="ghost"
            aria-label="Notifications"
            fontSize="20px"
          />
          
          <Menu>
            <MenuButton>
              <Avatar size="sm" name="User" bg="blue.500" />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaUserCircle />}>Profile</MenuItem>
              <MenuItem icon={<FaCog />}>Settings</MenuItem>
              <MenuItem icon={<FaSignOutAlt />}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    );
  };
  
  export default Header;