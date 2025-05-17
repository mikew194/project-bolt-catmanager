import React from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import CatCard from './CatCard';
import { Cat } from '../../types/cat';

interface CatGridProps {
  cats: Cat[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const CatGrid: React.FC<CatGridProps> = ({ cats, isLoading, onDelete }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (cats.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          px: 2,
          textAlign: 'center',
          backgroundColor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          No cats found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          There are no cats that match your criteria. Try adjusting your filters or add a new cat.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {cats.map((cat) => (
        <Grid item key={cat.id} xs={12} sm={6} md={4} lg={3}>
          <CatCard cat={cat} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CatGrid;