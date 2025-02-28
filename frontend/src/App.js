// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { CandidateProvider } from './contexts/CandidateContext';
import theme from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CandidateProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/interviews" element={<div>Interviews Page (Coming Soon)</div>} />
              <Route path="/analytics" element={<div>Analytics Page (Coming Soon)</div>} />
              <Route path="/positions" element={<div>Positions Page (Coming Soon)</div>} />
              <Route path="/settings" element={<div>Settings Page (Coming Soon)</div>} />
            </Routes>
          </Layout>
        </Router>
      </CandidateProvider>
    </ChakraProvider>
  );
}

export default App;