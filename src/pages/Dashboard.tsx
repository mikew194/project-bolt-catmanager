import React from 'react';
import { Typography, Grid, Box, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PlusCircle, Cat as CatIcon } from 'lucide-react';
import { useCatContext } from '../context/CatContext';
import QuickStats from '../components/Dashboard/QuickStats';
import RecentCats from '../components/Dashboard/RecentCats';
import AdoptionStats from '../components/Dashboard/AdoptionStats';

const Dashboard: React.FC = () => {
  const { cats, loading } = useCatContext();

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to FerrellCatManager. Here's an overview of your cats.
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

      {/* Quick Stats */}
      <QuickStats cats={cats} />

      <Grid container spacing={3}>
        {/* Status Chart */}
        <Grid item xs={12} md={6}>
          <AdoptionStats cats={cats} />
        </Grid>

        {/* Recent Cats */}
        <Grid item xs={12} md={6}>
          <RecentCats cats={cats} />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, mt: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  component={Link}
                  to="/cats"
                  variant="outlined"
                  fullWidth
                  sx={{ py: 2, height: '100%' }}
                  startIcon={<CatIcon size={20} />}
                >
                  View All Cats
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  component={Link}
                  to="/cats/new"
                  variant="outlined"
                  fullWidth
                  sx={{ py: 2, height: '100%' }}
                  startIcon={<PlusCircle size={20} />}
                >
                  Add New Cat
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;