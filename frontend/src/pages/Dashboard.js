// src/pages/Dashboard.js
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPlus, FaSearch, FaFileImport } from 'react-icons/fa';
import { useCandidates } from '../contexts/CandidateContext';
import CandidateTable from '../components/CandidateTable';
import CandidateModal from '../components/CandidateModal';
import ImportCandidateModal from '../components/ImportCandidateModal';

const Dashboard = () => {
  const { candidates, isLoading } = useCandidates();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
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

  const handleEditCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    onAddEditOpen();
  };

  const handleAddCandidate = () => {
    setSelectedCandidate(null);
    onAddEditOpen();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const query = searchQuery.toLowerCase();
    
    return (
      (candidate.name?.toLowerCase().includes(query) || false) ||
      (candidate.email?.toLowerCase().includes(query) || false) ||
      (candidate.position?.toLowerCase().includes(query) || false) ||
      (candidate.status?.toLowerCase().includes(query) || false)
    );
  });
  
  const candidateStats = {
    total: candidates.length,
    applied: candidates.filter(c => c.status === 'applied').length,
    screening: candidates.filter(c => c.status === 'screening').length,
    interview: candidates.filter(c => c.status === 'interview').length,
    offered: candidates.filter(c => c.status === 'offered').length,
    hired: candidates.filter(c => c.status === 'hired').length,
    rejected: candidates.filter(c => c.status === 'rejected').length,
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction="column" gap={6}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">Candidate Management</Heading>
          <HStack>
            <Button
              leftIcon={<FaFileImport />}
              colorScheme="purple"
              variant="outline"
              onClick={onImportOpen}
            >
              Import
            </Button>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              onClick={handleAddCandidate}
            >
              Add Candidate
            </Button>
          </HStack>
        </Flex>

        <Stack 
          direction={{ base: 'column', md: 'row' }} 
          bg="gray.50" 
          p={4} 
          borderRadius="md" 
          spacing={4}
          align="center"
          wrap="wrap"
        >
          <Box minW="200px">
            <Text fontWeight="bold" color="gray.500" fontSize="sm">
              TOTAL CANDIDATES
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {candidateStats.total}
            </Text>
          </Box>
          <Flex flex={1} wrap="wrap" gap={4} justify="space-around">
            <Box>
              <Text fontWeight="bold" color="gray.500" fontSize="sm">
                APPLIED
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {candidateStats.applied}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color="gray.500" fontSize="sm">
                SCREENING
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {candidateStats.screening}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color="gray.500" fontSize="sm">
                INTERVIEW
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {candidateStats.interview}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color="gray.500" fontSize="sm">
                OFFERED
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {candidateStats.offered}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color="gray.500" fontSize="sm">
                HIRED
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {candidateStats.hired}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color="gray.500" fontSize="sm">
                REJECTED
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {candidateStats.rejected}
              </Text>
            </Box>
          </Flex>
        </Stack>

        <Box>
          <InputGroup mb={4} maxW="400px">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>
          
          <CandidateTable 
            candidates={filteredCandidates} 
            isLoading={isLoading} 
            onEditCandidate={handleEditCandidate}
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
  );
};

export default Dashboard;