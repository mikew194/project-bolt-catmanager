import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { CatProvider } from './context/CatContext';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import CatListPage from './pages/CatListPage';
import CatDetailPage from './pages/CatDetailPage';
import AddCatPage from './pages/AddCatPage';
import EditCatPage from './pages/EditCatPage';

// Add global styles
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CatProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cats" element={<CatListPage />} />
              <Route path="/cats/:id" element={<CatDetailPage />} />
              <Route path="/cats/new" element={<AddCatPage />} />
              <Route path="/cats/:id/edit" element={<EditCatPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </Router>
      </CatProvider>
    </ThemeProvider>
  );
}

export default App;