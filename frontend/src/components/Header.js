import React from 'react';
import {
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
  MenuDivider,
} from '@chakra-ui/react';
import { 
  FaBell, 
  FaSearch, 
  FaUserCircle, 
  FaCog, 
  FaSignOutAlt, 
  FaUserPlus,
  FaPlus
} from 'react-icons/fa';
import { useCandidates } from '../contexts/CandidateContext';

const Header = ({ onImportClick, onAddCandidateClick }) => {
  const { filters, updateFilters } = useCandidates();

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={4}
      px={6}
      bg="#151515"
      borderBottomWidth="1px"
      borderColor="gray.700"
      color="white"
    >
      <InputGroup maxW="400px" display={{ base: 'none', md: 'block' }}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.400" />
        </InputLeftElement>
        <Input 
          placeholder="Search candidates and jobs..." 
          value={filters.search || ''}
          onChange={handleSearchChange}
          bg="#222222"
          border="1px solid"
          borderColor="gray.700"
          _hover={{
            borderColor: "gray.600"
          }}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px #3182ce"
          }}
        />
      </InputGroup>

      <Flex align="center" gap={4}>
        <IconButton
          icon={<FaBell />}
          variant="ghost"
          aria-label="Notifications"
          fontSize="20px"
          color="gray.400"
          _hover={{
            bg: "gray.700",
            color: "white"
          }}
        />
        
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaCog />}
            variant="ghost"
            aria-label="Settings"
            fontSize="20px"
            color="gray.400"
            _hover={{
              bg: "gray.700",
              color: "white"
            }}
          />
          <MenuList 
            bg="#202020" 
            borderColor="gray.700" 
            color="white"
            boxShadow="0px 5px 15px rgba(0, 0, 0, 0.5)"
          >
            <MenuItem 
              icon={<FaPlus />} 
              onClick={onAddCandidateClick}
              _hover={{ bg: "gray.700" }}
              bg="#202020"
              color="white"
            >
              Add Candidate
            </MenuItem>
            <MenuItem 
              icon={<FaUserPlus />} 
              onClick={onImportClick}
              _hover={{ bg: "gray.700" }}
              bg="#202020"
              color="white"
            >
              Import Candidates
            </MenuItem>
            <MenuDivider borderColor="gray.700" />
            <MenuItem 
              icon={<FaCog />}
              _hover={{ bg: "gray.700" }}
              bg="#202020"
              color="white"
            >
              General Settings
            </MenuItem>
          </MenuList>
        </Menu>
        
        <Menu>
          <MenuButton>
            <Avatar size="sm" name="User" bg="blue.500" />
          </MenuButton>
          <MenuList 
            bg="#202020" 
            borderColor="gray.700"
            color="white" 
            boxShadow="0px 5px 15px rgba(0, 0, 0, 0.5)"
          >
            <MenuItem 
              icon={<FaUserCircle />}
              _hover={{ bg: "gray.700" }}
              bg="#202020"
              color="white"
            >
              Profile
            </MenuItem>
            <MenuItem 
              icon={<FaSignOutAlt />}
              _hover={{ bg: "gray.700" }}
              bg="#202020"
              color="white"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;