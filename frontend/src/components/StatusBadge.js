import React from 'react';
import { Badge } from '@chakra-ui/react';

const statusColors = {
  APPLIED: { bg: 'blue.100', text: 'blue.800' },
  SCREENING: { bg: 'yellow.100', text: 'yellow.800' },
  INTERVIEW: { bg: 'green.100', text: 'green.800' },
  ASSESSMENT: { bg: 'cyan.100', text: 'cyan.800' },
  OFFER: { bg: 'indigo.100', text: 'indigo.800' },
  HIRED: { bg: 'purple.100', text: 'purple.800' },
  REJECTED: { bg: 'red.100', text: 'red.800' },
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toUpperCase() || 'APPLIED';
  const colorScheme = statusColors[normalizedStatus] || statusColors.APPLIED;
  
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="full"
      textTransform="capitalize"
      bg={colorScheme.bg}
      color={colorScheme.text}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;