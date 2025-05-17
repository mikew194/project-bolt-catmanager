import React from 'react';
import { 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Chip, 
  Box, 
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Cat } from '../../types/cat';
import { Edit as EditIcon, Trash2 as DeleteIcon, Check as CheckIcon, X as XIcon } from 'lucide-react';

interface CatCardProps {
  cat: Cat;
  onDelete: (id: string) => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, onDelete }) => {
  const theme = useTheme();

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

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={cat.imageUrl || 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg'}
        alt={cat.name}
        sx={{ objectFit: 'cover' }}
      />
      <Chip
        label={cat.adoptionStatus}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          backgroundColor: getStatusColor(cat.adoptionStatus),
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {cat.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {cat.breed} • {cat.age} {cat.age === 1 ? 'year' : 'years'} old
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={`${cat.weight} kg`} 
            size="small" 
            variant="outlined" 
          />
          <Chip 
            label={cat.healthStatus} 
            size="small" 
            color={cat.healthStatus === 'Excellent' ? 'success' : 'primary'} 
            variant="outlined" 
          />
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {cat.vaccinated ? (
              <CheckIcon size={16} color={theme.palette.success.main} />
            ) : (
              <XIcon size={16} color={theme.palette.error.main} />
            )}
            <Typography variant="body2">
              Vaccinated
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {cat.neutered ? (
              <CheckIcon size={16} color={theme.palette.success.main} />
            ) : (
              <XIcon size={16} color={theme.palette.error.main} />
            )}
            <Typography variant="body2">
              Neutered
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, height: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {cat.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          component={Link} 
          to={`/cats/${cat.id}`}
          variant="outlined"
        >
          View Details
        </Button>
        <Box>
          <Button 
            size="small" 
            component={Link} 
            to={`/cats/${cat.id}/edit`}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <EditIcon size={18} />
          </Button>
          <Button 
            size="small" 
            color="error" 
            onClick={() => onDelete(cat.id)}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <DeleteIcon size={18} />
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CatCard;