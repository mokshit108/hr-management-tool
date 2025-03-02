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
import { MdLocationOn } from 'react-icons/md';
import { PiArrowLineUpRight } from "react-icons/pi";
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
            <Heading size="md" mb={4} color="white" fontFamily="Urbanist, sans-serif" letterSpacing="widest">
                Current Openings
            </Heading>
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
                                borderRadius={16}
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
                                {/* Circular Gradient Effect */}
                                <Box
                                    position="absolute"
                                    top="-30px"
                                    right="-30px"
                                    width="180px"
                                    height="180px"
                                    
                                    background={`radial-gradient(circle, ${getCardColor(index)} 2%, rgba(0,0,0,0) 80%)`}
                                    opacity={0.3}
                                    pointerEvents="none"
                                />

                                {/* Icon in Top Right Corner */}
                                <Flex
                                    position="absolute"
                                    top="8px"
                                    right="8px"
                                    w="40px"
                                    h="40px"
                                    borderRadius="full"
                                    bg="gray.700"
                                    align="center"
                                    justify="center"
                                >
                                    <Icon as={PiArrowLineUpRight} boxSize={5} color="white" />
                                </Flex>

                                <CardBody>
                                    <Flex mb={3}>
                                        <Box p={3} pl={6}>
                                            {/* Title and Days Ago */}
                                            <Box>
                                                <Text fontWeight="semibold" letterSpacing="widest" fontSize="lg" color="white">
                                                    {job.title}
                                                </Text>
                                                <Flex align="center" color="gray.400">
                                                    <Text fontSize="sm">{formatDaysAgo(job.daysAgo || 2)}</Text>
                                                </Flex>
                                            </Box>
                                        </Box>
                                    </Flex>

                                    <VStack align="start">
                                        <HStack spacing={2} pb={3} flexWrap="wrap">
                                            <Badge
                                                bg="#282828"
                                                color="#898989"
                                                px={2}
                                                py={1}
                                                borderRadius="full"
                                                display="flex"
                                                alignItems="center"
                                                fontSize="sm"
                                                fontWeight={100}
                                                textTransform="capitalize"
                                            >
                                                <Icon as={MdLocationOn} mr={1} />
                                                {job.location}
                                            </Badge>
                                            <Badge
                                                bg="#282828"
                                                color="#898989"
                                                px={2}
                                                py={1}
                                                borderRadius="full"
                                                display="flex"
                                                alignItems="center"
                                                fontSize="sm"
                                                fontWeight={100}
                                                textTransform="lowercase"
                                            >
                                                <Icon as={BsMortarboard} mr={2} />
                                                {job.yearsExp} years of exp.
                                            </Badge>
                                        </HStack>
                                        <Flex align="center" justify="space-between" width="100%">
                                            {/* Applicants Count */}
                                            <Flex align="baseline">
                                                <Text fontSize="3xl" fontWeight="bold" letterSpacing="wider" color="white">
                                                    {job.candidate_count}
                                                </Text>
                                                <Text ml={1} mt={1} fontSize="sm" color="#898989">
                                                    applicants
                                                </Text>
                                            </Flex>

                                            {/* Last Week People Count - Right Aligned */}
                                            <Text fontSize="sm" mt={3} fontWeight={100} color="#00B85E">
                                                {job.lastWeekPeople} in last week
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
