import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  useDisclosure,
  useToast,
  Select,
  HStack,
  Text,
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Button
} from '@chakra-ui/react';
import { useCandidates } from '../contexts/CandidateContext';
import CandidateTable from '../components/CandidateTable';
import CandidateModal from '../components/CandidateModal';
import ImportCandidateModal from '../components/ImportCandidateModal';
import CurrentOpenings from '../components/CurrentOpenings';
import { FaSortDown } from "react-icons/fa";

const Dashboard = () => {
  const { candidates, isLoading: isCandidatesLoading, filters, updateFilters } = useCandidates();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [jobError, setJobError] = useState(null);
  const toast = useToast();

  const {
    isOpen: isAddEditOpen,
    onOpen: onAddEditOpen,
    onClose: onAddEditClose,
  } = useDisclosure();

  const {
    isOpen: isImportOpen,
    onOpen: onImportOpen,
    onClose: onImportClose,
  } = useDisclosure();

  // Generate years for filter (current year and 4 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleYearFilterChange = (e) => {
    updateFilters({ year: e.target.value });
  };

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsJobsLoading(true);
        const response = await fetch('http://localhost:5000/api/jobs');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Ensure years of experience is between 2-5
        const enhancedData = data.map(job => ({
          ...job,
          daysAgo: Math.floor(Math.random() * 14),
          yearsExp: Math.floor(Math.random() * 5) + 1,
          candidate_count: Math.floor(Math.random() * 100) + 1,
          lastWeekPeople: Math.floor(Math.random() * 16) + 10,
        }));
        setJobs(enhancedData);
        setJobError(null);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobError('Failed to load job openings. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load job openings.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsJobsLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  const handleEditCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    onAddEditOpen();
  };

  const handleAddCandidate = () => {
    setSelectedCandidate(null);
    onAddEditOpen();
  };

  return (
    <Box bg="#151515" minH="100vh" color="white" fontFamily="Urbanist, sans-serif">
      <Container maxW="container.xl">
        <Flex direction="column" gap={6}>
          {/* Using the CurrentOpenings component */}
          <CurrentOpenings
            jobs={jobs}
            isLoading={isJobsLoading}
            error={jobError}
          />

          <Box mt={6}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="md" mb={2} color="white" fontFamily="Urbanist, sans-serif" letterSpacing="widest">
                Candidates
              </Heading>

              {/* Years filter moved to Dashboard */}
              <HStack spacing={1}>
              <Box width="90px" mr={12}>
  <Menu>
    {/* Button to open the dropdown */}
    <MenuButton
      as={Button}
      rightIcon={<FaSortDown style={{ paddingBottom: "2px", height: "20px" }} />}
      bg="#252525"
      color="#898989"
      border="1px solid"
      borderColor="gray.700"
      _hover={{ borderColor: "gray.600" }}
      _expanded={{ bg: "#252525", color: "#898989" }} // Prevents color change when clicked
      _focus={{ boxShadow: "none" }} // Removes focus outline
      size="sm"
      borderRadius="full" // Rounded button
    >
      {filters.year || "Select Year"}
    </MenuButton>

    {/* Custom dropdown with rounded corners */}
    <MenuList
      bg="#252525"
      color="#898989"
      borderRadius="12px" // Curved dropdown
      border="1px solid gray"
      boxShadow="md"
      p={1}
    >
      {years.map((year) => (
        <MenuItem
          key={year}
          onClick={() => handleYearFilterChange({ target: { value: year } })}
          bg="transparent"
          _hover={{ bg: "gray.700", borderRadius: "8px" }} // Curve hover effect
          fontWeight="100"
        >
          {year}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
</Box>;
              </HStack>
            </Flex>

            {/* CandidateTable with internal tabs implementation */}
            <CandidateTable
              isLoading={isCandidatesLoading}
              onEditCandidate={handleEditCandidate}
              onAddCandidate={handleAddCandidate}
              tableProps={{
                bg: '#202020',
                theadProps: {
                  bg: '#252525',
                  color: 'white',
                  fontFamily: 'Urbanist, sans-serif'
                },
                showSortIcons: true
              }}
            />
          </Box>
        </Flex>

        <CandidateModal
          isOpen={isAddEditOpen}
          onClose={onAddEditClose}
          candidate={selectedCandidate}
        />

        <ImportCandidateModal
          isOpen={isImportOpen}
          onClose={onImportClose}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;