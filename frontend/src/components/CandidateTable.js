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
  Select,
  Spinner,
  Text,
  HStack
} from '@chakra-ui/react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useCandidates } from '../contexts/CandidateContext';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';

const CandidateTable = ({ onEditCandidate }) => {
  const { 
    candidates, 
    loading, 
    error, 
    filters, 
    updateFilters 
  } = useCandidates();
  
  const navigate = useNavigate();
  
  const handleYearFilterChange = (e) => {
    updateFilters({ year: e.target.value });
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
      <FiChevronUp aria-label="Sorted ascending" color="white" /> : 
      <FiChevronDown aria-label="Sorted descending" color="white" />;
  };
  
  const handleRowClick = (id) => {
    if (onEditCandidate) {
      const candidate = candidates.find(c => c.id === id);
      onEditCandidate(candidate);
    } else {
      navigate(`/candidates/${id}`);
    }
  };
  
  // Generate years for filter (current year and 4 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);
  
  if (error) {
    return (
      <Box p={4} bg="#252525" color="red.300" borderRadius="md">
        <Text>{error}</Text>
      </Box>
    );
  }
  
  return (
    <Box bg="#202020" borderRadius="md" shadow="md" overflow="hidden" borderColor="gray.700" borderWidth="1px">
      <Flex p={4} borderBottomWidth="1px" borderColor="gray.700" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={3}>
        <HStack spacing={4} flex="1" minW="200px">
          <Box width="200px">
            <Select 
              placeholder="All Years" 
              value={filters.year || ''}
              onChange={handleYearFilterChange}
              bg="#252525"
              borderColor="gray.700"
              _hover={{
                borderColor: "gray.600"
              }}
              color="white"
            >
              {years.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </Select>
          </Box>
        </HStack>
      </Flex>
      
      {loading ? (
        <Flex justify="center" align="center" py={10}>
          <Spinner size="xl" color="blue.400" />
        </Flex>
      ) : candidates.length === 0 ? (
        <Box p={8} textAlign="center" color="gray.400">
          <Text fontSize="lg">No candidates found</Text>
          <Text fontSize="sm" mt={2}>Try adjusting your filters or import new candidates</Text>
        </Box>
      ) : (
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead bg="#252525">
            <Tr>
              <Th 
                cursor="pointer" 
                onClick={() => handleSortChange('last_name')}
                color="gray.300"
                borderColor="gray.700"
              >
                <Flex align="center">
                  Candidate 
                  {getSortIcon('last_name')}
                </Flex>
              </Th>
              <Th color="gray.300" borderColor="gray.700">Position</Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSortChange('applied_at')}
                color="gray.300"
                borderColor="gray.700"
              >
                <Flex align="center">
                  Applied Date
                  {getSortIcon('applied_at')}
                </Flex>
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSortChange('experience_years')}
                color="gray.300"
                borderColor="gray.700"
              >
                <Flex align="center">
                  Experience
                  {getSortIcon('experience_years')}
                </Flex>
              </Th>
              <Th color="gray.300" borderColor="gray.700">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {candidates.map((candidate) => (
              <Tr 
                key={candidate.id} 
                _hover={{ bg: "#252525" }}
                cursor="pointer"
                onClick={() => handleRowClick(candidate.id)}
              >
                <Td borderColor="gray.700">
                  <Text fontWeight="medium">{candidate.first_name} {candidate.last_name}</Text>
                  <Text fontSize="sm" color="gray.400">{candidate.email}</Text>
                </Td>
                <Td borderColor="gray.700">{candidate.job_title}</Td>
                <Td borderColor="gray.700">{format(new Date(candidate.applied_at), 'MMM dd, yyyy')}</Td>
                <Td borderColor="gray.700">{candidate.experience_years} years</Td>
                <Td borderColor="gray.700">
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