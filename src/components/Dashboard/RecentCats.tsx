import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import { Cat } from '../../types/cat';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RecentCatsProps {
  cats: Cat[];
}

const RecentCats: React.FC<RecentCatsProps> = ({ cats }) => {
  const theme = useTheme();
  
  // Sort cats by intake date (newest first) and take the top 5
  const recentCats = [...cats]
    .sort((a, b) => new Date(b.intakeDate).getTime() - new Date(a.intakeDate).getTime())
    .slice(0, 5);

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
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Recent Intakes
        </Typography>
        <Button
          component={Link}
          to="/cats"
          size="small"
          endIcon={<ArrowRight size={16} />}
        >
          View All
        </Button>
      </Box>

      <List sx={{ bgcolor: 'background.paper' }}>
        {recentCats.map((cat) => (
          <ListItem
            key={cat.id}
            alignItems="flex-start"
            component={Link}
            to={`/cats/${cat.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: 1,
              mb: 1,
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={cat.name}
                src={cat.imageUrl}
                sx={{ width: 50, height: 50, mr: 1 }}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
                    {cat.name}
                  </Typography>
                  <Chip
                    label={cat.adoptionStatus}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(cat.adoptionStatus),
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                    }}
                  />
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    {cat.breed}, {cat.age} {cat.age === 1 ? 'year' : 'years'} old
                  </Typography>
                  <Typography component="div" variant="body2" color="text.secondary">
                    Intake date: {formatDate(cat.intakeDate)}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}

        {recentCats.length === 0 && (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No recent cat intakes
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
};

export default RecentCats;