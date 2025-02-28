// src/components/CandidateModal.js
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
  } from '@chakra-ui/react';
  import CandidateForm from './CandidateForm';
  
  const CandidateModal = ({ isOpen, onClose, candidate }) => {
    const handleSubmit = () => {
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {candidate?.id ? 'Edit Candidate' : 'Add New Candidate'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CandidateForm
              candidate={candidate}
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default CandidateModal;