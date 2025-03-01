import React from 'react';
import { Badge } from '@chakra-ui/react';

const StatusBadge = ({ status }) => {
  // Function to extract and format the status
  const formatStatus = (statusString) => {
    // Check if the status follows the CandidateStatus.XXX pattern
    if (statusString && statusString.includes('CandidateStatus.')) {
      // Extract the part after the dot and convert to lowercase
      return statusString.split('.')[1].toLowerCase();
    }
    // If it's already just the status word, return it as is
    return statusString ? statusString.toLowerCase() : '';
  };

  // Get the formatted status
  const formattedStatus = formatStatus(status);

  // Define color schemes based on status
  const getColorScheme = () => {
    switch (formattedStatus) {
      case 'applied':
        return 'blue';
      case 'screening':
        return 'purple';
      case 'designchallenge':
        return 'orange';
      case 'interview':
        return 'cyan';
      case 'hrround':
        return 'teal';
      case 'hired':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Badge colorScheme={getColorScheme()} borderRadius="full" px={2} py={1}>
      {formattedStatus}
    </Badge>
  );
};

export default StatusBadge;