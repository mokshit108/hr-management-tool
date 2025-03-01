// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { CandidateProvider } from './contexts/CandidateContext';
import theme from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#151515">
        <CandidateProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </Layout>
          </Router>
        </CandidateProvider>
      </Box>
    </ChakraProvider>
  );
}

export default App;