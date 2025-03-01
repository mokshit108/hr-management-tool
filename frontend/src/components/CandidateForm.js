// src/components/CandidateForm.js
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useCandidates } from '../contexts/CandidateContext';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  position: Yup.string().required('Position is required'),
  status: Yup.string().required('Status is required'),
  resume_link: Yup.string().url('Must be a valid URL'),
  interview_date: Yup.string(),
});

const CandidateForm = ({ candidate, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addCandidate, updateCandidate } = useCandidates();

  const initialValues = candidate 
    ? { ...candidate }
    : {
        name: '',
        email: '',
        phone: '',
        position: '',
        status: 'applied',
        resume_link: '',
        interview_date: '',
      };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (candidate?.id) {
          await updateCandidate(candidate.id, values);
        } else {
          await addCandidate(values);
        }
        onSubmit();
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box as="form" onSubmit={formik.handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            name="name"
            {...formik.getFieldProps('name')}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.email && formik.errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps('email')}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.phone && formik.errors.phone}>
          <FormLabel>Phone</FormLabel>
          <Input
            id="phone"
            name="phone"
            {...formik.getFieldProps('phone')}
          />
          <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.position && formik.errors.position}>
          <FormLabel>Position</FormLabel>
          <Input
            id="position"
            name="position"
            {...formik.getFieldProps('position')}
          />
          <FormErrorMessage>{formik.errors.position}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.status && formik.errors.status}>
          <FormLabel>Status</FormLabel>
          <Select id="status" name="status" {...formik.getFieldProps('status')}>
          <option value="applied">Applied</option>
            <option value="screening">Screening</option>
            <option value="designchallenge">Design Challenge</option>
            <option value="interview">Interview</option>
            <option value="hrround">HR Round</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </Select>
          <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.resume_link && formik.errors.resume_link}>
          <FormLabel>Resume Link</FormLabel>
          <Input
            id="resume_link"
            name="resume_link"
            {...formik.getFieldProps('resume_link')}
          />
          <FormErrorMessage>{formik.errors.resume_link}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.interview_date && formik.errors.interview_date}>
          <FormLabel>Interview Date</FormLabel>
          <Input
            id="interview_date"
            name="interview_date"
            type="datetime-local"
            {...formik.getFieldProps('interview_date')}
          />
          <FormErrorMessage>{formik.errors.interview_date}</FormErrorMessage>
        </FormControl>

        <HStack spacing={4} justify="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            {candidate?.id ? 'Update' : 'Add'} Candidate
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CandidateForm;