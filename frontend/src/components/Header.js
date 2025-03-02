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
  Box,
} from '@chakra-ui/react';
import { 
  FaRegBell, 
  FaSignOutAlt, 
  FaUserPlus,
  FaPlus
} from 'react-icons/fa';
import { SlSettings } from "react-icons/sl";

import { CiSearch } from "react-icons/ci";
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
          <CiSearch color="gray.400" />
        </InputLeftElement>
        <Input 
          placeholder="Search candidates and jobs..." 
          value={filters.search || ''}
          onChange={handleSearchChange}
          bg="#222222"
          border="1px solid"
          borderColor="gray.700"
          borderRadius="full"
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
        <Box
          bg="#222222"
          borderRadius="full"
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            icon={<FaRegBell />}
            color="#898989"
            variant="unstyled"
            aria-label="Notifications"
            fontSize="16px"
            
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="auto"
            minW="auto"
          />
        </Box>
        
        <Menu>
          <MenuButton
            as={Box}
            bg="#222222"
            color="#898989"
            borderRadius="full"
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
          >
            <SlSettings color fontSize="16px" />
          </MenuButton>
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
              icon={<SlSettings />}
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
            <Avatar size="sm" src="/images/profile.png" name="User" bg="blue.500" />
          </MenuButton>
          <MenuList 
            bg="#202020" 
            borderColor="gray.700"
            color="white" 
            boxShadow="0px 5px 15px rgba(0, 0, 0, 0.5)"
          >
            <MenuItem 
              _hover={{ bg: "gray.700" }}
              bg="#202020"
              color="white"
            >
              <Flex align="center" gap={2}>
                <Avatar size="xs" src="/images/profile.png" />
                Profile
              </Flex>
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