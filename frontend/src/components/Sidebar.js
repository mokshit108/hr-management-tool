// src/components/Sidebar.js
import {
    Box,
    Flex,
    Icon,
    Text,
    VStack,
    Divider,
    Link,
  } from '@chakra-ui/react';
  import { Link as RouterLink, useLocation } from 'react-router-dom';
  import {
    FaUsers,
    FaCalendarAlt,
    FaChartLine,
    FaCog,
    FaUserTie,
  } from 'react-icons/fa';
  
  const NavItem = ({ icon, children, to, active }) => {
    return (
      <Link
        as={RouterLink}
        to={to}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={active ? 'blue.50' : 'transparent'}
          color={active ? 'blue.500' : 'gray.600'}
          fontWeight={active ? 'semibold' : 'medium'}
          _hover={{
            bg: 'blue.50',
            color: 'blue.500',
          }}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };
  
  const Sidebar = () => {
    const location = useLocation();
    
    return (
      <Box
        w={{ base: 'full', md: '240px' }}
        h="full"
        bg="white"
        borderRightWidth="1px"
        borderColor="gray.200"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            HR Tool
          </Text>
        </Flex>
        <VStack spacing={1} align="stretch">
          <NavItem 
            icon={FaUsers} 
            to="/" 
            active={location.pathname === '/'}
          >
            Candidates
          </NavItem>
          <NavItem 
            icon={FaCalendarAlt} 
            to="/interviews" 
            active={location.pathname === '/interviews'}
          >
            Interviews
          </NavItem>
          <NavItem 
            icon={FaChartLine} 
            to="/analytics" 
            active={location.pathname === '/analytics'}
          >
            Analytics
          </NavItem>
          
          <Divider my={6} />
          
          <NavItem 
            icon={FaUserTie} 
            to="/positions" 
            active={location.pathname === '/positions'}
          >
            Positions
          </NavItem>
          <NavItem 
            icon={FaCog} 
            to="/settings" 
            active={location.pathname === '/settings'}
          >
            Settings
          </NavItem>
        </VStack>
      </Box>
    );
  };
  
  export default Sidebar;