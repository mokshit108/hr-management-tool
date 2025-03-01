import React from 'react';
import {
  Box,
  Heading,
  Card,
  CardBody,
  Badge,
  HStack,
  Divider,
  Spinner,
  Center,
  Flex,
  Text,
  Icon,
  VStack
} from '@chakra-ui/react';
import { FaRegClock } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { BsPersonBadge, BsMortarboard } from 'react-icons/bs';

// Function to get a color based on card index
const getCardColor = (index) => {
  const colorMap = [
    '#29C5EE', // first card
    '#CF1A2C', // second card
    '#EAB04D', // third card
    '#19C8A7'  // fourth card
  ];
  
  return colorMap[index % 4]; // cycle through colors if more than 4 cards
};

// Function to format days ago
const formatDaysAgo = (days) => {
  if (days === 0) return 'Posted today';
  if (days === 1) return 'Posted yesterday';
  return `Posted ${days} days ago`;
};

const CurrentOpenings = ({ jobs, isLoading, error }) => {
  return (
    <Box my={6}>
      <Heading size="md" mb={4} color="white" fontFamily="Urbanist, sans-serif" letterSpacing="widest"  >Current Openings</Heading>
      {isLoading ? (
        <Center p={8}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : error ? (
        <Card bg="#202020" borderColor="red.500" borderWidth="1px" p={4}>
          <Text color="red.300">{error}</Text>
        </Card>
      ) : jobs.length === 0 ? (
        <Card bg="#202020" borderColor="gray.700" borderWidth="1px" p={4}>
          <Text>No job openings available at the moment.</Text>
        </Card>
      ) : (
        <Box
          overflowX="auto"
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            'scrollbarWidth': 'none', /* Firefox */
            '-ms-overflow-style': 'none', /* IE and Edge */
          }}
        >
          <Flex direction="row" minWidth="min-content" width="100%" pb={2}>
            {jobs.map((job, index) => (
              <Card 
                key={job.id} 
                bg="#202020" 
                borderColor="gray.700" 
                borderWidth="1px"
                position="relative"
                overflow="hidden"
                minWidth="300px"
                maxWidth="300px"
                mr={4}
                _before={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  backgroundColor: getCardColor(index),
                }}
              >
                <CardBody>
                  <Flex mb={3}>
                    
                    <Box>
                      <Text fontWeight="semibold" fontSize="lg" color="white">{job.title}</Text>
                      <Flex align="center" mt={1} color="gray.400">
                        <Icon as={FaRegClock} mr={1} fontSize="xs" />
                        <Text fontSize="sm">{formatDaysAgo(job.daysAgo || 2)}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                  
                  <VStack spacing={3} align="start">
                    <HStack spacing={2} flexWrap="wrap">
                      <Badge 
                        bg="#404040" 
                        color="white" 
                        px={2} 
                        py={1} 
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                      >
                        <Icon as={MdLocationOn} mr={1} />
                        {job.location}
                      </Badge>
                      <Badge 
                        bg="#404040" 
                        color="white" 
                        px={2} 
                        py={1} 
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                      >
                        <Icon as={BsMortarboard} mr={1} />
                        {job.yearsExp} yrs
                      </Badge>
                    </HStack>
                    <Divider borderColor="gray.700" />
                    <Flex align="baseline">
                    <Text fontSize="lg" fontWeight="bold" color="white">
                    {job.candidate_count}
                    </Text>
                    <Text ml={1} fontSize="sm" color="gray.400">
                      applicants
                    </Text>
                    </Flex>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CurrentOpenings;