import React, { useState } from 'react';
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Box, 
  Flex,
  Spinner,
  Text,
  Tabs,
  TabList,
  Tab,
  Divider,
  Icon,
  HStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Avatar,
  Badge,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { FiChevronUp, FiChevronDown, FiPaperclip, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaStar, FaSort } from "react-icons/fa";
import { useCandidates } from '../contexts/CandidateContext';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const CandidateTable = () => {
  const { 
    candidates, 
    loading, 
    error, 
    filters, 
    updateFilters 
  } = useCandidates();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const handleSortChange = (field) => {
    if (filters.sort_by === field) {
      // Toggle sort order if the same field
      updateFilters({ sort_order: filters.sort_order === 'asc' ? 'desc' : 'asc' });
    } else {
      // Set new sort field with default descending order
      updateFilters({ sort_by: field, sort_order: 'desc' });
    }
  };
  
  const getSortIcon = (field) => {
    if (filters.sort_by !== field) {
      return <Icon as={FaSort} aria-label="Sort" color="#898989" />;
    }
    
    return filters.sort_order === 'asc' ? 
      <Icon as={FiChevronUp} aria-label="Sorted ascending" color="white" /> : 
      <Icon as={FiChevronDown} aria-label="Sorted descending" color="white" />;
  };
  
  const handleRowClick = (id) => {
    const candidate = candidates.find(c => c.id === id);
    setSelectedCandidate(candidate);
    setIsSidebarOpen(true);
  };
  
  const getRandomAttachments = () => {
    return Math.floor(Math.random() * 5) + 1;
  };
  
  // Format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  // Helper function to extract the status value
  const getStatusValue = (statusString) => {
    if (!statusString) return '';
    
    // Check if status is in the format "CandidateStatus.ACCEPTED"
    if (statusString.includes('.')) {
      return statusString.split('.')[1].toLowerCase();
    }
    
    return statusString.toLowerCase();
  };
  
  // Sort candidates based on current filters
  const sortCandidates = (candidates) => {
    if (!filters.sort_by) return candidates;
    
    const sortedCandidates = [...candidates].sort((a, b) => {
      let valueA, valueB;
      
      // Get correct values based on sort field
      if (filters.sort_by === 'rating') {
        valueA = a.rating; 
        valueB = b.rating;
      } else if (filters.sort_by === 'status') {
        // Extract status text for sorting
        valueA = getStatusValue(a.status);
        valueB = getStatusValue(b.status);
      } else if (filters.sort_by === 'applied_at') {
        valueA = new Date(a.applied_at).getTime();
        valueB = new Date(b.applied_at).getTime();
      } else if (filters.sort_by === 'last_name') {
        valueA = a.last_name.toLowerCase();
        valueB = b.last_name.toLowerCase();
      } else {
        valueA = a[filters.sort_by];
        valueB = b[filters.sort_by];
      }
      
      // Perform actual sort
      if (valueA < valueB) return filters.sort_order === 'asc' ? -1 : 1;
      if (valueA > valueB) return filters.sort_order === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sortedCandidates;
  };
  
  // Filter candidates based on active tab and year filter
  const getFilteredCandidates = () => {
    const filtered = candidates.filter(candidate => {
      const statusValue = getStatusValue(candidate.status);
      
      // Apply tab filter
      const passesTabFilter = 
        activeTab === 'all' || 
        (activeTab === 'accepted' && statusValue === 'accepted') ||
        (activeTab === 'rejected' && statusValue === 'rejected');
      
      if (!passesTabFilter) return false;
      
      // Apply year filter
      if (filters.year) {
        const appliedYear = new Date(candidate.applied_at).getFullYear().toString();
        return appliedYear === filters.year;
      }
      
      return true;
    });
    
    return sortCandidates(filtered);
  };
  
  const filteredCandidates = getFilteredCandidates();
  
  if (error) {
    return (
      <Box p={4} bg="#252525" color="red.300" borderRadius="md">
        <Text>{error}</Text>
      </Box>
    );
  }
  
  return (
    <>
      <Box bg="#202020" borderRadius="md" shadow="md" overflow="hidden" borderColor="#1E1E1E" borderWidth="1px" mb={4}>
        <Box position="relative">
          <Tabs variant="unstyled" onChange={(index) => setActiveTab(index === 0 ? 'all' : index === 1 ? 'accepted' : 'rejected')}>
            <TabList px={8} pt={4} pb={4}>
              <Tab 
                _selected={{ 
                  color: "white",
                  position: "relative",
                  _after: {
                    content: '""',
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(to right, #6E38E0, #FF5F36)",
                    zIndex: 1
                  }
                }}
                color="#898989"
                fontWeight="medium"
                letterSpacing="wide"
                px={6}
              >
                All
              </Tab>
              <Tab 
                _selected={{ 
                  color: "white",
                  position: "relative",
                  _after: {
                    content: '""',
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(to right, #6E38E0, #FF5F36)",
                    zIndex: 1
                  }
                }}
                color="#898989"
                fontWeight="medium"
                letterSpacing="wide"
                px={6}
              >
                Accepted
              </Tab>
              <Tab 
                _selected={{ 
                  color: "white",
                  position: "relative",
                  _after: {
                    content: '""',
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(to right, #6E38E0, #FF5F36)",
                    zIndex: 1
                  }
                }}
                color="#898989"
                fontWeight="medium"
                letterSpacing="wide"
                px={6}
              >
                Rejected
              </Tab>
            </TabList>
            <Divider borderColor="#898989" position="relative" top="-2px" />
          </Tabs>
        </Box>
       
        {loading ? (
          <Flex justify="center" align="center" py={10}>
            <Spinner size="xl" color="blue.400" />
          </Flex>
        ) : filteredCandidates.length === 0 ? (
          <Box p={8} textAlign="center" color="gray.400">
            <Text fontSize="lg">No candidates found</Text>
            <Text fontSize="sm" mt={2}>
              {filters.year ? 
                `No candidates found for year ${filters.year}. Try selecting a different year.` : 
                'Try adjusting your filters or import new candidates'}
            </Text>
          </Box>
        ) : (
          <Box overflowX="auto" p={4} mb={3}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th 
                    cursor="pointer" 
                    color="#898989"
                    borderColor="transparent"
                    textTransform="uppercase"
                    px={4}
                    py={5}
                    bg="#252525"
                    fontSize="14px"
                    letterSpacing="wide"
                    borderTopLeftRadius="md"
                    borderLeftRadius="md"
                    fontWeight={100}
                  >
                    <Flex align="center">
                      CANDIDATE NAME
                    </Flex>
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSortChange('rating')}
                    color="#898989"
                    borderColor="transparent"
                    textTransform="uppercase"
                    px={4}
                    py={5}
                    bg="#252525"
                    fontSize="14px"
                    letterSpacing="wide"
                    fontWeight={100}
                  >
                    <Flex align="center">
                      RATING
                      {getSortIcon('rating')}
                    </Flex>
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSortChange('status')}
                    color="#898989"
                    borderColor="transparent"
                    textTransform="uppercase"
                    px={4}
                    py={5}
                    bg="#252525"
                    fontSize="14px"
                    letterSpacing="wide"
                    fontWeight={100}
                  >
                    <Flex align="center">
                      STAGES
                      {getSortIcon('status')}
                    </Flex>
                  </Th>
                  <Th 
                    color="#898989" 
                    borderColor="transparent"
                    textTransform="uppercase"
                    px={4}
                    py={5}
                    bg="#252525"
                    fontSize="14px"
                    letterSpacing="wide"
                    fontWeight={100}
                  >
                    APPLIED ROLE
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSortChange('applied_at')}
                    color="#898989"
                    borderColor="transparent"
                    textTransform="uppercase"
                    px={2}
                    py={5}
                    bg="#252525"
                    fontSize="14px"
                    letterSpacing="wide"
                    fontWeight={100}
                  >
                    <Flex align="center">
                      APPLICATION DATE
                      {getSortIcon('applied_at')}
                    </Flex>
                  </Th>
                  <Th 
                    color="#898989" 
                    borderColor="transparent"
                    textTransform="uppercase"
                    px={2}
                    py={5}
                    bg="#252525"
                    fontSize="14px"
                    letterSpacing="wide"
                    borderTopRightRadius="md"
                    borderRightRadius="md"
                    fontWeight={100}
                  >
                    ATTACHMENTS
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCandidates.map((candidate) => (
                  <Tr 
                    key={candidate.id} 
                    _hover={{ bg: "#252525" }}
                    cursor="pointer"
                    onClick={() => handleRowClick(candidate.id)}
                  >
                    <Td borderColor="transparent" py={4} px={6}>
                      <Text fontWeight="medium">{candidate.first_name} {candidate.last_name}</Text>
                    </Td>
                    <Td borderColor="transparent" py={4} px={6}>
                      <HStack spacing={2}>
                        <Icon as={FaStar} color="yellow.400" />
                        <Text>{candidate.rating ? candidate.rating.toFixed(1) : "N/A"}</Text>
                      </HStack>
                    </Td>
                    <Td borderColor="transparent" py={4} px={6}>
                      <StatusBadge status={candidate.status} />
                    </Td>
                    <Td borderColor="transparent" py={4} px={6}>{candidate.job_title}</Td>
                    <Td borderColor="transparent" py={4} px={6}>
                      {formatDate(candidate.applied_at)}
                      {filters.year && (
                        <Text fontSize="xs" color="gray.500">{new Date(candidate.applied_at).getFullYear()}</Text>
                      )}
                    </Td>
                    <Td borderColor="transparent" py={4} px={6}>
                      <Flex align="center">
                        <Icon as={FiPaperclip} mr={2} />
                        <Text>{getRandomAttachments()} files</Text>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>

      {/* Candidate Details Sidebar - Now on right side with 25% width */}
      <Drawer
        isOpen={isSidebarOpen}
        placement="right"
        onClose={() => setIsSidebarOpen(false)}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent 
          bg="#202020" 
          color="white" 
          maxWidth="25%"
        >
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" borderColor="#333" pb={4}>
            Candidate Profile
          </DrawerHeader>

          <DrawerBody>
            {selectedCandidate && (
              <VStack spacing={6} align="stretch" pt={4}>
                {/* Profile Header */}
                <Flex direction="column" align="center" mb={4}>
                  <Avatar 
                    size="lg" 
                    name={`${selectedCandidate.first_name} ${selectedCandidate.last_name}`} 
                    bg="purple.500"
                    mb={4}
                  />
                  <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    {selectedCandidate.first_name} {selectedCandidate.last_name}
                  </Text>
                  <Text color="gray.400" fontSize="sm" textAlign="center">
                    {selectedCandidate.job_title}
                  </Text>
                  <HStack mt={2} spacing={2}>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text>{selectedCandidate.rating ? selectedCandidate.rating.toFixed(1) : "N/A"}</Text>
                  </HStack>
                  <Box mt={3}>
                    <StatusBadge status={selectedCandidate.status} />
                  </Box>
                </Flex>

                <Divider borderColor="#333" />

                {/* Contact Information */}
                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3}>
                    Contact Information
                  </Text>
                  <VStack spacing={3} align="stretch">
                    <HStack spacing={3}>
                      <Icon as={FiMail} color="gray.400" />
                      <Text fontSize="sm">{selectedCandidate.email || 'candidate@example.com'}</Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Icon as={FiPhone} color="gray.400" />
                      <Text fontSize="sm">{selectedCandidate.phone || '+1 (555) 123-4567'}</Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Icon as={FiMapPin} color="gray.400" />
                      <Text fontSize="sm">{selectedCandidate.location || 'San Francisco, CA'}</Text>
                    </HStack>
                  </VStack>
                </Box>

                <Divider borderColor="#333" />

                {/* Application Details */}
                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3}>
                    Application Details
                  </Text>
                  <Grid templateColumns="repeat(1, 1fr)" gap={3}>
                    <GridItem>
                      <Text color="gray.400" fontSize="xs">Applied Role</Text>
                      <Text fontSize="sm">{selectedCandidate.job_title}</Text>
                    </GridItem>
                    <GridItem>
                      <Text color="gray.400" fontSize="xs">Application Date</Text>
                      <Text fontSize="sm">{formatDate(selectedCandidate.applied_at)}</Text>
                      <Text fontSize="xs" color="gray.500">{new Date(selectedCandidate.applied_at).getFullYear()}</Text>
                    </GridItem>
                    <GridItem>
                      <Text color="gray.400" fontSize="xs">Source</Text>
                      <Text fontSize="sm">{selectedCandidate.source || 'LinkedIn'}</Text>
                    </GridItem>
                    <GridItem>
                      <Text color="gray.400" fontSize="xs">Referral</Text>
                      <Text fontSize="sm">{selectedCandidate.referral || 'N/A'}</Text>
                    </GridItem>
                  </Grid>
                </Box>

                <Divider borderColor="#333" />

                {/* Attachments */}
                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3}>
                    Attachments
                  </Text>
                  <VStack align="stretch" spacing={3}>
                    <HStack p={2} bg="#252525" borderRadius="md" justify="space-between">
                      <HStack>
                        <Icon as={FiPaperclip} fontSize="sm" />
                        <Text fontSize="sm">Resume.pdf</Text>
                      </HStack>
                      <Badge colorScheme="blue" fontSize="xs">Resume</Badge>
                    </HStack>
                    <HStack p={2} bg="#252525" borderRadius="md" justify="space-between">
                      <HStack>
                        <Icon as={FiPaperclip} fontSize="sm" />
                        <Text fontSize="sm">Cover_Letter.pdf</Text>
                      </HStack>
                      <Badge colorScheme="purple" fontSize="xs">Cover Letter</Badge>
                    </HStack>
                  </VStack>
                </Box>

                <Divider borderColor="#333" />

                {/* Experience */}
                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3}>
                    Experience
                  </Text>
                  <VStack align="stretch" spacing={3}>
                    <Box>
                      <Text fontWeight="medium" fontSize="sm">Senior Developer</Text>
                      <Text color="gray.400" fontSize="sm">TechCorp Inc.</Text>
                      <Text fontSize="xs" color="gray.500">Jan 2020 - Present</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="medium" fontSize="sm">Frontend Developer</Text>
                      <Text color="gray.400" fontSize="sm">WebSolutions</Text>
                      <Text fontSize="xs" color="gray.500">Mar 2017 - Dec 2019</Text>
                    </Box>
                  </VStack>
                </Box>

                <Divider borderColor="#333" />

                {/* Education */}
                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3}>
                    Education
                  </Text>
                  <Box>
                    <Text fontWeight="medium" fontSize="sm">Bachelor of Science in Computer Science</Text>
                    <Text color="gray.400" fontSize="sm">University of Technology</Text>
                    <Text fontSize="xs" color="gray.500">2013 - 2017</Text>
                  </Box>
                </Box>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CandidateTable;