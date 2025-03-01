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
        borderRadius="0 9999px 9999px 0" // Flat left side, rounded right side
        role="group"
        cursor="pointer"
        bg={active ? '#2D3748' : 'transparent'}
        color={active ? 'white' : 'white'}
        fontWeight={active ? 'semibold' : 'medium'}
        fontFamily="Urbanist"
        letterSpacing="widest"
        bgGradient={active ? 'linear(to-r, #6E38E0, #FF5F36)' : 'none'}
        _hover={{
          bgGradient: 'linear(to-r, #6E38E0, #FF5F36)',
          color: 'white',
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
    w={{ base: 'full', md: '320px' }} // Increased width
      h="full"
      bg="#151515"
      borderRightWidth="1px"
      borderColor="gray.700"
      fontFamily="Urbanist"
    >
      {/* Sidebar Header */}
      <Flex h="24" alignItems="center" mx="8">
        <Text 
          fontSize="2xl" 
          fontWeight="bold" 
          color="white"
          letterSpacing="widest"
          fontFamily="Urbanist"
        >
          RSKD Talent
        </Text>
      </Flex>

      <Divider mt={0} mb={6} borderColor="gray.700" />

      <VStack spacing={1} align="stretch">
        {/* Section Title */}
        <Text 
          px="8" 
          fontSize="14px" 
          fontWeight="medium" 
          color="#898989" 
          letterSpacing="widest"
          lineHeight="taller"
          mb={2}
          fontFamily="Urbanist"
        >
          RECRUITMENT
        </Text>

        {/* Nav Item */}
        <NavItem 
          icon={FaUsers} 
          to="/" 
          active={location.pathname === '/'}
        >
          Candidates
        </NavItem>
      </VStack>
    </Box>
  );
};

export default Sidebar;
