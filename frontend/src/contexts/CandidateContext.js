import React, { createContext, useContext, useState, useEffect } from 'react';
import { candidateApi, jobApi } from '../services/api';

// Create context
const CandidateContext = createContext();

// Create provider component
export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    sort_by: 'applied_at',
    sort_order: 'desc'
  });

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const data = await jobApi.getJobs();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again later.');
    }
  };

  // Fetch candidates with filters
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const data = await candidateApi.getCandidates(filters);
      setCandidates(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError('Failed to fetch candidates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Create or import candidates
  const importCandidates = async (candidateData) => {
    try {
      await candidateApi.importCandidates(candidateData);
      fetchCandidates();
      return true;
    } catch (err) {
      console.error('Error importing candidates:', err);
      setError('Failed to import candidates. Please try again.');
      return false;
    }
  };

  // Update candidate status
  const updateCandidateStatus = async (id, status) => {
    try {
      await candidateApi.updateCandidateStatus(id, status);
      fetchCandidates();
      return true;
    } catch (err) {
      console.error('Error updating candidate status:', err);
      setError('Failed to update candidate status. Please try again.');
      return false;
    }
  };

  // Load candidates when filters change
  useEffect(() => {
    fetchCandidates();
  }, [filters]);

  // Load jobs on initial load
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        jobs,
        loading,
        error,
        filters,
        updateFilters,
        importCandidates,
        updateCandidateStatus,
        refreshCandidates: fetchCandidates,
        refreshJobs: fetchJobs,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

// Create hook for using the context
export const useCandidates = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  return context;
};

export default CandidateContext;