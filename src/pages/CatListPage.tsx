import React, { useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useCatContext } from '../context/CatContext';
import { CatService } from '../services/catService';
import CatGrid from '../components/cats/CatGrid';
import CatFilter from '../components/cats/CatFilter';
import ConfirmDialog from '../components/common/ConfirmDialog';

const CatListPage: React.FC = () => {
  const { filteredCats, loading, filters, filterCats, clearFilters, fetchCats } = useCatContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleDeleteClick = (id: string) => {
    setCatToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!catToDelete) return;

    setIsDeleting(true);
    try {
      const success = CatService.deleteCat(catToDelete);
      setIsDeleting(false);
      setDeleteDialogOpen(false);

      if (success) {
        setSnackbar({
          open: true,
          message: 'Cat successfully deleted',
          severity: 'success',
        });
        // Refresh cats
        fetchCats();
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

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
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
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Cat Directory
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and browse your cat database
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/cats/new"
          variant="contained"
          startIcon={<PlusCircle size={20} />}
          sx={{ minWidth: 140 }}
        >
          Add Cat
        </Button>
      </Box>

      <CatFilter
        onFilter={filterCats}
        onClear={clearFilters}
        currentFilters={filters}
      />

      <Box sx={{ mt: 3 }}>
        <CatGrid
          cats={filteredCats}
          isLoading={loading}
          onDelete={handleDeleteClick}
        />
      </Box>

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Cat"
        message="Are you sure you want to delete this cat? This action cannot be undone."
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

export default CatListPage;