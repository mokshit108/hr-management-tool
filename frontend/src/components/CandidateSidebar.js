import React from 'react';
import {
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    Avatar,
    Badge,
    Grid,
    GridItem,
    Flex,
    Text,
    Divider,
    Box,
    HStack,
    Icon,
    Circle,
    Stack,
    Wrap,
    Button,
    DrawerFooter
} from '@chakra-ui/react';
import { FaPhoneAlt, FaFilePdf } from "react-icons/fa";
import { FiPaperclip, FiCheck, FiClock, FiArrowRight, FiX } from 'react-icons/fi';
import { MdEmail } from "react-icons/md";
import { transparentize } from "@chakra-ui/theme-tools";


const CandidateSidebar = ({ isOpen, onClose, candidate }) => {
    // Format date as DD/MM/YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    // Function to extract status from the CandidateStatus enum format
    const formatStatus = (statusString) => {
        // Check if the status follows the CandidateStatus.XXX pattern
        if (statusString && typeof statusString === 'string' && statusString.includes('CandidateStatus.')) {
            // Extract the part after the dot
            return statusString.split('.')[1];
        }

        // If it's already just the status word, return it
        if (statusString) {
            return statusString;
        }

        return 'SCREENING'; // Default fallback
    };

    // Helper function to determine which steps are completed based on status
    const getHiringStepStatus = (status) => {
        // Map the status from the enum to our timeline representation
        const statusMapping = {
            'APPLIED': 0,
            'SCREENING': 0,
            'DESIGNCHALLENGE': 1,
            'INTERVIEW': 2,
            'HRROUND': 3,
            'HIRED': 4,
            'ACCEPTED': 0,
            'REJECTED': -2
        };

        const steps = [
            { id: 'screening', label: 'Screening', color: '#00B85E', step: 1 },
            { id: 'design_challenge', label: 'Design Challenge', color: '#EAB04D', step: 2 },
            { id: 'interview', label: 'Interview', color: '#1A9CE0', step: 3 },
            { id: 'hr_round', label: 'HR Round', color: '#9C5CFF', step: 4 },
            { id: 'hired', label: 'Hired', color: '#00B85E', step: 5 }
        ];

        // Get the current step index based on status
        const currentStepIndex = statusMapping[status] ?? -1;

        return steps.map((step, index) => ({
            ...step,
            isCompleted: index <= currentStepIndex,
            isCurrent: index === currentStepIndex,
            isUpcoming: index > currentStepIndex
        }));
    };

    // Get the proper status string from candidate.status
    const rawStatus = formatStatus(candidate?.status);
    const candidateStatus = rawStatus.toUpperCase();

    // Get the hiring steps with completion status
    const hiringSteps = getHiringStepStatus(candidateStatus);

    // Get current step color for badge
    const getCurrentStepColor = () => {
        const currentStep = hiringSteps.find(step => step.isCurrent);
        return currentStep ? currentStep.color : "#00B85E"; // Default to green if not found
    };

    const isRejected = candidateStatus === 'REJECTED';

    return (
        <>
            <DrawerOverlay />
            <DrawerContent
                bg="#151515"
                color="white"
                maxWidth="35%" // Increased width from 25% to 35%
                position="relative"
            >
                <Box
                    position="absolute"
                    top="1rem"
                    right="1rem"
                    bg="#1E1E1E"
                    borderRadius="50%"
                    width="2.5rem"
                    height="2rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <DrawerCloseButton color="#898989" position="static" />
                </Box>
                <DrawerHeader letterSpacing="widest">
                    Candidate Details
                </DrawerHeader>

                <DrawerBody>
                    {candidate && (
                        <VStack spacing={6} align="stretch">
                            {/* CARD 1: Profile Header */}
                            <Box bg="#1E1E1E" borderRadius="md" p={4}>
                                <Flex direction="column" align="center" mb={8}>
                                    <Avatar
                                        size="lg"
                                        name={`${candidate.first_name} ${candidate.last_name}`}
                                        bg="purple.500"
                                        mb={4}
                                    />
                                    <Text fontSize="xl" letterSpacing="widest" fontWeight="bold" textAlign="center">
                                        {candidate.first_name} {candidate.last_name}
                                    </Text>
                                    <Text color="#898989" fontSize="sm" textAlign="center">
                                        {candidate.job_title}
                                    </Text>
                                </Flex>

                                {/* Updated Contact info with larger icons and layout */}
                                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                                    <GridItem>
                                        <HStack spacing={3} align="flex-start">
                                            <Circle size="36px" bg="#262626" display="flex" alignItems="center" justifyContent="center">
                                                <Icon as={MdEmail} fontSize="18px" color="#898989" />
                                            </Circle>
                                            <VStack spacing={0} align="flex-start">
                                                <Text fontSize="xs" fontWeight={100} color="#898989" textTransform="uppercase">
                                                    Email
                                                </Text>
                                                <Text fontSize="sm" color="white" noOfLines={1}>
                                                    {candidate.email || 'candidate@example.com'}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </GridItem>

                                    <GridItem>
                                        <HStack spacing={3} align="flex-start">
                                            <Circle size="36px" bg="#262626" display="flex" alignItems="center" justifyContent="center">
                                                <Icon as={FaPhoneAlt} fontSize="16px" color="#898989" />
                                            </Circle>
                                            <VStack spacing={0} align="flex-start">
                                                <Text fontSize="xs" fontWeight={100} color="#898989" textTransform="uppercase">
                                                    Phone Number
                                                </Text>
                                                <Text fontSize="sm" color="white">
                                                    {candidate.phone || '+1 (555) 123-4567'}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </GridItem>
                                </Grid>
                            </Box>

                            {/* CARD 2: Hiring Process Timeline - UPDATED */}
                            <Box bg="#1E1E1E" borderRadius="md" p={5}>
                                <Flex justify="space-between" align="center" mb={5}>
                                    <Text fontSize="lg" letterSpacing="widest">
                                        Application Details
                                    </Text>

                                    {/* Add Rejected Badge next to Application Details if the candidate is rejected */}
                                    {isRejected && (
                                        <Badge
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            backgroundColor="rgba(224, 56, 56, 0.2)"
                                            color="#E03838"
                                            fontSize="xs"
                                            fontWeight="medium"
                                        >
                                            Rejected
                                        </Badge>
                                    )}
                                </Flex>

                                <VStack spacing={0} align="stretch">
                                    {hiringSteps.map((step, index) => (
                                        <Box key={step.id} position="relative" mb={4}>
                                            <HStack spacing={4} mb={2}>
                                                <Flex
                                                    w="32px"
                                                    h="32px"
                                                    borderRadius="full"
                                                    bg={isRejected ? "#E03838" : (step.isCompleted || step.isCurrent ? step.color : "#2A2A2A")}
                                                    justify="center"
                                                    align="center"
                                                    borderWidth={step.isCurrent ? "2px" : "0px"}
                                                    borderColor="white"
                                                    zIndex={1}
                                                >
                                                    {/* Show checkmark for completed steps */}
                                                    {(step.isCompleted || step.isCurrent) ? (
                                                        <Icon as={isRejected && step.isCurrent ? FiX : FiCheck} color="white" fontSize="lg" />
                                                    ) : (
                                                        <Text color="white" letterSpacing="widest" fontSize="md" fontWeight="medium">
                                                            {step.step}
                                                        </Text>
                                                    )}
                                                </Flex>
                                                <Box flex="1">
                                                    <Text
                                                        letterSpacing="widest"
                                                        fontSize="md"
                                                        fontWeight={step.isCurrent ? "bold" : (step.isCompleted ? "medium" : "normal")}
                                                        color={step.isCompleted || step.isCurrent ? "white" : "#898989"}
                                                    >
                                                        {step.label}
                                                    </Text>
                                                    {step.isCurrent && (
                                                        <Text letterSpacing="widest" fontSize="sm" color={isRejected ? "#E03838" : step.color} fontWeight="medium">
                                                            {isRejected ? "Rejected" : "Current Stage"}
                                                        </Text>
                                                    )}
                                                </Box>

                                                {/* Add status badge to the right of current step */}
                                                {step.isCurrent && candidateStatus !== 'HIRED' && !isRejected && (
                                                    <Badge
                                                        px={2}
                                                        py={1}
                                                        borderRadius="full"
                                                        backgroundColor={transparentize(step.color, 0.2)} // 20% opacity
                                                        color={step.color}
                                                        fontSize="xs"
                                                        fontWeight={100}
                                                    >
                                                        Under Review
                                                    </Badge>
                                                )}
                                            </HStack>

                                            {/* Line connecting steps - showing completion */}
                                            {index < hiringSteps.length - 1 && (
                                                <Box
                                                    position="absolute"
                                                    left="16px"
                                                    top="32px"
                                                    h="32px"
                                                    w="4px"
                                                    bg={isRejected ? "#2A2A2A" : (step.isCompleted ? step.color : "#2A2A2A")}
                                                    zIndex={0}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>

                            {/* CARD 3: Experience & Education */}
                            <Box bg="#1E1E1E" borderRadius="md" p={4}>
                                {/* Experience Section */}
                                <Text fontSize="lg" mb={4} letterSpacing="widest">
                                    Experience
                                </Text>
                                <VStack align="stretch" spacing={4}>

                                    <Box>
                                        {/* Title & Date in One Line */}
                                        <HStack justify="space-between">
                                            <Text fontSize="xs" color="#898989" >{candidate.jobtitle} Fresher</Text>
                                        </HStack>

                                        
                                        <Text fontWeight="medium" fontSize="sm" mt={2} letterSpacing="widest">
                                            Soft Skills
                                        </Text>

                                        {/* Notes */}
                                        {candidate.notes && (
                                            <Text fontSize="xs" color="#898989" mt={1}>
                                                {candidate.notes}
                                            </Text>
                                        )}

                                        <Text fontWeight="medium" fontSize="sm" mt={2} letterSpacing="widest">
                                            Skills
                                        </Text>

                                        {/* Skills */}
                                        {candidate.skills && (
                                            <Text fontSize="xs" color="#898989" mt={1}>
                                                {candidate.skills}
                                            </Text>
                                        )}
                                    </Box>
                                </VStack>

                                <Divider borderColor="#333" my={4} />

                                {/* Education Section */}
                                <Text fontSize="lg" letterSpacing="widest">
                                    Education
                                </Text>
                                <Box>
                                    <Text fontWeight="medium" fontSize="sm">{candidate.education}</Text>
                                </Box>

                                <Divider borderColor="#333" my={4} />
                            </Box>
                        </VStack>
                    )}
                </DrawerBody>

                {/* Footer with three action buttons in a single row */}
                <DrawerFooter bg="#1E1E1E" borderTopWidth="1px" borderTopColor="#333" py={4}>
                    <Flex width="100%" gap={3}>
                        {/* Move to Next Step Button - 70% width */}
                        <Button
                            height="50px"
                            flex="0.7"
                            borderRadius="sm"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="md"
                            fontWeight="bold"
                            color="white"
                            _hover={{ opacity: 0.9 }}
                            backgroundImage="linear-gradient(107.3deg, #6E38E0 13.39%, #FF5F36 77.64%)"
                        >
                            Move to Next Step
                        </Button>

                        {/* Reject Button - 15% width */}
                        <Button
                            height="50px"
                            flex="0.15"
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="sm"
                            fontWeight="bold"
                            color="white"
                            _hover={{ opacity: 0.9 }}
                            backgroundImage="linear-gradient(107.3deg, #38E0AE 13.39%, #AF36FF 77.64%)"
                        >
                            Reject
                        </Button>

                        {/* PDF Button - 15% width */}
                        <Button
                            height="50px"
                            flex="0.15"
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="sm"
                            fontWeight="bold"
                            color="white"
                            _hover={{ opacity: 0.9 }}
                            backgroundImage="linear-gradient(107.3deg, #E03838 13.39%, #FFA836 77.64%)"
                        >
                            PDF
                        </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </>
    );
};

export default CandidateSidebar;