import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Heart, PawPrint, Calendar, Activity } from 'lucide-react';
import { Cat } from '../../types/cat';

interface QuickStatsProps {
  cats: Cat[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ cats }) => {
  // Calculate stats
  const totalCats = cats.length;
  const availableCats = cats.filter(cat => cat.adoptionStatus === 'available').length;
  const adoptedCats = cats.filter(cat => cat.adoptionStatus === 'adopted').length;
  const recentIntakes = cats.filter(cat => {
    const intakeDate = new Date(cat.intakeDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return intakeDate >= thirtyDaysAgo;
  }).length;

  const statItems = [
    {
      title: 'Total Cats',
      value: totalCats,
      icon: <PawPrint size={24} />,
      color: '#5b5d94',
    },
    {
      title: 'Available',
      value: availableCats,
      icon: <Heart size={24} />,
      color: '#4caf50',
    },
    {
      title: 'Adopted',
      value: adoptedCats,
      icon: <Heart size={24} />,
      color: '#ff9a3d',
    },
    {
      title: 'Recent Intakes',
      value: recentIntakes,
      icon: <Calendar size={24} />,
      color: '#2196f3',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statItems.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '100%',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              },
              borderLeft: `4px solid ${stat.color}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ color: stat.color, mr: 1 }}>{stat.icon}</Box>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                {stat.title}
              </Typography>
            </Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 600, mt: 1 }}>
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStats;