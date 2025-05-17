import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Cat } from '../../types/cat';

interface AdoptionStatsProps {
  cats: Cat[];
}

const AdoptionStats: React.FC<AdoptionStatsProps> = ({ cats }) => {
  // Count cats by adoption status
  const statusCounts = cats.reduce((acc, cat) => {
    acc[cat.adoptionStatus] = (acc[cat.adoptionStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get total for percentage calculations
  const total = cats.length;

  // Define colors for each status
  const statusColors: Record<string, string> = {
    available: '#4caf50',
    adopted: '#5b5d94',
    pending: '#ff9800',
    foster: '#2196f3',
  };

  // Calculate segment widths based on percentages
  const segments = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: total > 0 ? (count / total) * 100 : 0,
    color: statusColors[status] || '#cccccc',
  }));

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Adoption Status
      </Typography>

      {/* Bar chart */}
      <Box sx={{ width: '100%', height: 40, display: 'flex', borderRadius: 1, overflow: 'hidden', mb: 3 }}>
        {segments.map((segment, index) => (
          <Box
            key={index}
            sx={{
              width: `${segment.percentage}%`,
              bgcolor: segment.color,
              height: '100%',
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 0.9,
                transform: 'scaleY(1.1)',
              },
            }}
            title={`${segment.status}: ${segment.count} (${segment.percentage.toFixed(1)}%)`}
          />
        ))}
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
        {segments.map((segment, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: segment.color,
              }}
            />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                {segment.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {segment.count} ({segment.percentage.toFixed(1)}%)
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default AdoptionStats;