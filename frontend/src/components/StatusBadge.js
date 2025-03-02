import React from 'react';
import { Text } from '@chakra-ui/react';

const StatusBadge = ({ status }) => {
  // Function to extract and format the status
  const formatStatus = (statusString) => {
    // Check if the status follows the CandidateStatus.XXX pattern
    if (statusString && statusString.includes('CandidateStatus.')) {
      // Extract the part after the dot, convert to lowercase and capitalize first letter
      const rawStatus = statusString.split('.')[1].toLowerCase();
      return rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);
    }
    
    // If it's already just the status word, capitalize first letter
    if (statusString) {
      return statusString.charAt(0).toUpperCase() + statusString.slice(1).toLowerCase();
    }
    
    return '';
  };
  
  // Get the formatted status
  const formattedStatus = formatStatus(status);
  
  return (
    <Text color="white">
      {formattedStatus}
    </Text>
  );
};

export default StatusBadge;