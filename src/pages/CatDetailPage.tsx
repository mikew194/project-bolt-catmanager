import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Avatar,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit, Trash2, ArrowLeft, Check, X } from 'lucide-react';
import { CatService } from '../services/catService';
import { Cat } from '../types/cat';
import ConfirmDialog from '../components/common/ConfirmDialog';

const CatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      const success = CatService.deleteCat(id);
      setIsDeleting(false);
      setDeleteDialogOpen(false);

      if (success) {
        setSnackbar({
          open: true,
          message: 'Cat successfully deleted',
          severity: 'success',
        });
        // Navigate back to the list after a short delay
        setTimeout(() => {
          navigate('/cats');
        }, 1500);
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to delete cat',
          severity: 'error',
        });
      }
    } catch (error) {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSnackbar({
        open: true,
        message: 'An error occurred while deleting the cat',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusColor = (status: Cat['adoptionStatus']) => {
    switch (status) {
      case 'available':
        return theme.palette.success.main;
      case 'pending':
        return theme.palette.warning.main;
      case 'adopted':
        return theme.palette.primary.main;
      case 'foster':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
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
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Cat not found
        </Typography>
        <Button component={Link} to="/cats" variant="contained" sx={{ mt: 2 }}>
          Back to Cat List
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      {/* Header with actions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            component={Link}
            to="/cats"
            startIcon={<ArrowLeft size={18} />}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1">
            {cat.name}
          </Typography>
          <Chip
            label={cat.adoptionStatus}
            size="small"
            sx={{
              backgroundColor: getStatusColor(cat.adoptionStatus),
              color: 'white',
              fontWeight: 'bold',
              ml: 1,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            to={`/cats/${cat.id}/edit`}
            variant="outlined"
            startIcon={<Edit size={18} />}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Trash2 size={18} />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main details */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Grid container spacing={3}>
              {/* Image */}
              <Grid item xs={12} sm={6}>
                <Box
                  component="img"
                  src={cat.imageUrl || 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg'}
                  alt={cat.name}
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
              </Grid>

              {/* Basic Info */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Breed</Typography>
                  <Typography variant="body1">{cat.breed}</Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Age</Typography>
                  <Typography variant="body1">{cat.age} {cat.age === 1 ? 'year' : 'years'}</Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Color</Typography>
                  <Typography variant="body1">{cat.color}</Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Weight</Typography>
                  <Typography variant="body1">{cat.weight} kg</Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Health Status</Typography>
                  <Typography variant="body1">{cat.healthStatus}</Typography>
                </Box>
              </Grid>
              
              {/* Description */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {cat.description || 'No description available.'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Health & Status
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ width: 150 }}>Vaccinated:</Typography>
                {cat.vaccinated ? (
                  <Chip 
                    icon={<Check size={16} />} 
                    label="Yes" 
                    color="success" 
                    size="small" 
                    variant="outlined" 
                  />
                ) : (
                  <Chip 
                    icon={<X size={16} />} 
                    label="No" 
                    color="error" 
                    size="small" 
                    variant="outlined" 
                  />
                )}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ width: 150 }}>Neutered:</Typography>
                {cat.neutered ? (
                  <Chip 
                    icon={<Check size={16} />} 
                    label="Yes" 
                    color="success" 
                    size="small" 
                    variant="outlined" 
                  />
                ) : (
                  <Chip 
                    icon={<X size={16} />} 
                    label="No" 
                    color="error" 
                    size="small" 
                    variant="outlined" 
                  />
                )}
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Intake Date</Typography>
              <Typography variant="body1">{formatDate(cat.intakeDate)}</Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Last Checkup</Typography>
              <Typography variant="body1">{formatDate(cat.lastCheckup)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Cat"
        message={`Are you sure you want to delete ${cat.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={isDeleting}
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

export default CatDetailPage;