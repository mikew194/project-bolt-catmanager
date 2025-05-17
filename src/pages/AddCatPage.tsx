import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CatService } from '../services/catService';
import { CatFormData } from '../types/cat';
import CatForm from '../components/cats/CatForm';

const AddCatPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleSubmit = async (catData: CatFormData) => {
    setIsSubmitting(true);
    try {
      const newCat = CatService.createCat(catData);
      setIsSubmitting(false);
      setSnackbar({
        open: true,
        message: `${newCat.name} has been successfully added`,
        severity: 'success',
      });
      
      // Navigate to the new cat's detail page after a short delay
      setTimeout(() => {
        navigate(`/cats/${newCat.id}`);
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      setSnackbar({
        open: true,
        message: 'Failed to add cat. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Add New Cat
      </Typography>

      <CatForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        title="New Cat Information"
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCatPage;