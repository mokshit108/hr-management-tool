import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints for candidates
export const candidateApi = {
  // Get all candidates with optional filtering
  getCandidates: async (params = {}) => {
    const response = await api.get('/candidates', { params });
    return response.data;
  },
  
  // Get a single candidate by ID
  getCandidate: async (id) => {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  },
  
  // Create a new candidate
  createCandidate: async (candidate) => {
    const response = await api.post('/candidates', candidate);
    return response.data;
  },
  
  // Update candidate status
  updateCandidateStatus: async (id, status) => {
    const response = await api.put(`/candidates/${id}/status`, { status });
    return response.data;
  },
  
  // Import multiple candidates
  importCandidates: async (candidates) => {
    const response = await api.post('/candidates/import', candidates);
    return response.data;
  },
  
  // Generate candidate PDF
  generatePdf: async (id) => {
    // Using return URL to trigger file download
    return `${api.defaults.baseURL}/candidates/${id}/pdf`;
  }
};

// API endpoints for job positions
export const jobApi = {
  // Get all job positions
  getJobs: async (params = {}) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },
  
  // Get a single job by ID
  getJob: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
  
  // Create a new job position
  createJob: async (job) => {
    const response = await api.post('/jobs', job);
    return response.data;
  },
  
  // Update a job position
  updateJob: async (id, job) => {
    const response = await api.put(`/jobs/${id}`, job);
    return response.data;
  }
};

export default api;