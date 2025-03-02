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
  Text
} from '@chakra-ui/react';
import { useCandidates } from '../contexts/CandidateContext';
import CandidateTable from '../components/CandidateTable';
import CandidateModal from '../components/CandidateModal';
import ImportCandidateModal from '../components/ImportCandidateModal';
import CurrentOpenings from '../components/CurrentOpenings';

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
  const years = Array.from({length: 5}, (_, i) => currentYear - i);
  
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
              <HStack spacing={4}>
                <Box width="150px">
                  <Select 
                    value={filters.year || ''}
                    onChange={handleYearFilterChange}
                    bg="#252525"
                    borderColor="gray.700"
                    _hover={{
                      borderColor: "gray.600"
                    }}
                    color="white"
                    size="sm"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year.toString()}>{year}</option>
                    ))}
                  </Select>
                </Box>
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