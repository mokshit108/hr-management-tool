import React from 'react';
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Box, 
  Flex,
  Input,
  Select,
  Button,
  IconButton,
  Spinner,
  Text,
  HStack
} from '@chakra-ui/react';
import { FiChevronUp, FiChevronDown, FiFilter, FiSearch, FiUserPlus } from 'react-icons/fi';
import { useCandidates } from '../contexts/CandidateContext';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';

const CandidateTable = ({ onImportClick }) => {
  const { 
    candidates, 
    loading, 
    error, 
    filters, 
    updateFilters 
  } = useCandidates();
  
  const navigate = useNavigate();
  
  const handleStatusFilterChange = (e) => {
    updateFilters({ status: e.target.value });
  };
  
  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };
  
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
    if (filters.sort_by !== field) return null;
    
    return filters.sort_order === 'asc' ? 
      <FiChevronUp aria-label="Sorted ascending" /> : 
      <FiChevronDown aria-label="Sorted descending" />;
  };
  
  const handleRowClick = (id) => {
    navigate(`/candidates/${id}`);
  };
  
  if (error) {
    return (
      <Box p={4} bg="red.50" color="red.800" borderRadius="md">
        <Text>{error}</Text>
      </Box>
    );
  }
  
  return (
    <Box bg="white" borderRadius="md" shadow="sm" overflow="hidden">
      <Flex p={4} borderBottomWidth="1px" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={3}>
        <HStack spacing={4} flex="1" minW="300px">
          <Box position="relative" flex="1">
            <Input
              placeholder="Search candidates"
              value={filters.search}
              onChange={handleSearchChange}
              pl={10}
            />
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
              <FiSearch color="gray.400" />
            </Box>
          </Box>
          
          <Box width="200px">
            <Select 
              placeholder="All Statuses" 
              value={filters.status}
              onChange={handleStatusFilterChange}
              icon={<FiFilter />}
            >
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="interview">Interview</option>
              <option value="assessment">Assessment</option>
              <option value="offer">Offer</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </Select>
          </Box>
        </HStack>
        
        <Button 
          leftIcon={<FiUserPlus />} 
          colorScheme="blue" 
          onClick={onImportClick}
        >
          Import Candidates
        </Button>
      </Flex>
      
      {loading ? (
        <Flex justify="center" align="center" py={10}>
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : candidates.length === 0 ? (
        <Box p={8} textAlign="center" color="gray.500">
          <Text fontSize="lg">No candidates found</Text>
          <Text fontSize="sm" mt={2}>Try adjusting your filters or import new candidates</Text>
        </Box>
      ) : (
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th 
                cursor="pointer" 
                onClick={() => handleSortChange('last_name')}
              >
                <Flex align="center">
                  Candidate 
                  {getSortIcon('last_name')}
                </Flex>
              </Th>
              <Th>Position</Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSortChange('applied_at')}
              >
                <Flex align="center">
                  Applied Date
                  {getSortIcon('applied_at')}
                </Flex>
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSortChange('experience_years')}
              >
                <Flex align="center">
                  Experience
                  {getSortIcon('experience_years')}
                </Flex>
              </Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {candidates.map((candidate) => (
              <Tr 
                key={candidate.id} 
                _hover={{ bg: 'gray.50' }}
                cursor="pointer"
                onClick={() => handleRowClick(candidate.id)}
              >
                <Td>
                  <Text fontWeight="medium">{candidate.first_name} {candidate.last_name}</Text>
                  <Text fontSize="sm" color="gray.600">{candidate.email}</Text>
                </Td>
                <Td>{candidate.job_title}</Td>
                <Td>{format(new Date(candidate.applied_at), 'MMM dd, yyyy')}</Td>
                <Td>{candidate.experience_years} years</Td>
                <Td>
                  <StatusBadge status={candidate.status} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default CandidateTable;