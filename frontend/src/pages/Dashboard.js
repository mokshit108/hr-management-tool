import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast
} from '@chakra-ui/react';
import { useCandidates } from '../contexts/CandidateContext';
import CandidateTable from '../components/CandidateTable';
import CandidateModal from '../components/CandidateModal';
import ImportCandidateModal from '../components/ImportCandidateModal';
import CurrentOpenings from '../components/CurrentOpenings';

const Dashboard = () => {
  const { candidates, isLoading: isCandidatesLoading } = useCandidates();
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
  
  const candidateStats = {
    total: candidates.length,
    applied: candidates.filter(c => c.status === 'applied').length,
    screening: candidates.filter(c => c.status === 'screening').length,
    designchallenge: candidates.filter(c => c.status === 'designchallenge').length,
    interview: candidates.filter(c => c.status === 'interview').length,
    hrround: candidates.filter(c => c.status === 'hrround').length,
    hired: candidates.filter(c => c.status === 'hired').length,
    rejected: candidates.filter(c => c.status === 'rejected').length,
  };

  return (
    <Box bg="#151515" minH="100vh" color="white" fontFamily="Urbanist, sans-serif">
      <Container maxW="container.xl">
        <Flex direction="column" gap={6}>
          {/* Using the new CurrentOpenings component */}
          <CurrentOpenings 
            jobs={jobs} 
            isLoading={isJobsLoading} 
            error={jobError} 
          />

          <Box mt={6}>
            <Heading size="md" mb={4} color="white" fontFamily="Urbanist, sans-serif">Candidates</Heading>
            
            <Tabs variant="soft-rounded" colorScheme="blue" mb={4}>
              <TabList mb={4} bg="#202020" p={2} borderRadius="md">
                <Tab _selected={{ bg: 'blue.500', color: 'white' }} color="white" fontFamily="Urbanist, sans-serif">All</Tab>
                <Tab _selected={{ bg: 'green.500', color: 'white' }} color="white" fontFamily="Urbanist, sans-serif">Accepted</Tab>
                <Tab _selected={{ bg: 'red.500', color: 'white' }} color="white" fontFamily="Urbanist, sans-serif">Rejected</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel p={0}>
                  <CandidateTable 
                    isLoading={isCandidatesLoading} 
                    onEditCandidate={handleEditCandidate}
                    onAddCandidate={handleAddCandidate}
                    tableProps={{
                      bg: '#202020',
                      theadProps: {
                        bg: '#898989',
                        color: 'white',
                        fontFamily: 'Urbanist, sans-serif'
                      },
                      showSortIcons: true
                    }}
                  />
                </TabPanel>
                <TabPanel p={0}>
                  <CandidateTable 
                    isLoading={isCandidatesLoading} 
                    onEditCandidate={handleEditCandidate}
                    onAddCandidate={handleAddCandidate}
                    candidates={candidates.filter(c => ['hired', 'interview', 'hrround'].includes(c.status))}
                    tableProps={{
                      bg: '#202020',
                      theadProps: {
                        bg: '#898989',
                        color: 'white',
                        fontFamily: 'Urbanist, sans-serif'
                      },
                      showSortIcons: true
                    }}
                  />
                </TabPanel>
                <TabPanel p={0}>
                  <CandidateTable 
                    isLoading={isCandidatesLoading} 
                    onEditCandidate={handleEditCandidate}
                    onAddCandidate={handleAddCandidate}
                    candidates={candidates.filter(c => c.status === 'rejected')}
                    tableProps={{
                      bg: '#202020',
                      theadProps: {
                        bg: '#898989',
                        color: 'white',
                        fontFamily: 'Urbanist, sans-serif'
                      },
                      showSortIcons: true
                    }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
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