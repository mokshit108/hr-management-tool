import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useCandidates } from '../contexts/CandidateContext';
import api from '../services/api';

const ImportCandidateModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { refreshCandidates } = useCandidates();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
  };

  const handleImport = async () => {
    if (!file) {
      setError('Please select a file to import');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      setIsLoading(true);
      await api.post('/candidates/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      await refreshCandidates();
      setFile(null);
      onClose();
    } catch (err) {
      setError('Failed to import candidates. Please check your file format.');
      console.error('Import error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import Candidates</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          <Text mb={4}>
            Upload a CSV file with candidate data. The file should have the following columns:
            name, email, phone, position, status, resume_link, and interview_date.
          </Text>
          
          <FormControl>
            <FormLabel>Select CSV File</FormLabel>
            <Input 
              type="file" 
              accept=".csv" 
              onChange={handleFileChange}
              p={1}
            />
          </FormControl>
          
          {file && (
            <Box mt={2}>
              <Text fontWeight="bold">Selected file:</Text>
              <Text>{file.name}</Text>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleImport}
            isLoading={isLoading}
            loadingText="Importing"
          >
            Import
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImportCandidateModal;