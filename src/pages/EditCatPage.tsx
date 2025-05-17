import React, { useState, useEffect } from 'react';
import { Box, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { CatService } from '../services/catService';
import { Cat, CatFormData } from '../types/cat';
import CatForm from '../components/cats/CatForm';

const EditCatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    if (!id) return;

    const fetchCat = () => {
      try {
        const fetchedCat = CatService.getCatById(id);
        if (fetchedCat) {
          setCat(fetchedCat);
        } else {
          setSnackbar({
            open: true,
            message: 'Cat not found',
            severity: 'error',
          });
          navigate('/cats');
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Error loading cat details',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCat();
  }, [id, navigate]);

  const handleSubmit = async (catData: CatFormData) => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      const updatedCat = CatService.updateCat(id, catData);
      setIsSubmitting(false);
      
      if (updatedCat) {
        setSnackbar({
          open: true,
          message: `${updatedCat.name} has been successfully updated`,
          severity: 'success',
        });
        
        // Navigate to the cat's detail page after a short delay
        setTimeout(() => {
          navigate(`/cats/${id}`);
        }, 1500);
      } else {
        throw new Error('Failed to update cat');
      }
    } catch (error) {
      setIsSubmitting(false);
      setSnackbar({
        open: true,
        message: 'Failed to update cat. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!cat) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Cat not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Edit Cat
      </Typography>

      <CatForm
        initialData={cat}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        title="Edit Cat Information"
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

export default EditCatPage;