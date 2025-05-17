import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
  Collapse,
  IconButton,
  useTheme,
} from '@mui/material';
import { ChevronDown, ChevronUp, Filter, X as ClearIcon } from 'lucide-react';
import { CatFilter as CatFilterType } from '../../types/cat';
import { CatService } from '../../services/catService';

interface CatFilterProps {
  onFilter: (filters: CatFilterType) => void;
  onClear: () => void;
  currentFilters: CatFilterType;
}

const CatFilter: React.FC<CatFilterProps> = ({ onFilter, onClear, currentFilters }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<CatFilterType>(currentFilters);
  const theme = useTheme();

  const breeds = CatService.getBreeds();
  const adoptionStatuses = CatService.getAdoptionStatuses();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (name === 'minAge' || name === 'maxAge') {
      const numValue = value === '' ? undefined : Number(value);
      setFilters({ ...filters, [name]: numValue });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const isFiltersApplied = Object.keys(currentFilters).length > 0;

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        border: isFiltersApplied ? `1px solid ${theme.palette.primary.main}` : 'none',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Filter size={20} color={theme.palette.primary.main} />
          <Typography variant="h6" component="h2">
            Filter Cats
          </Typography>
          {isFiltersApplied && (
            <Chip
              label={`${Object.keys(currentFilters).length} active`}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
        <IconButton
          onClick={toggleExpanded}
          size="small"
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                name="breed"
                label="Breed"
                value={filters.breed || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
              >
                <MenuItem value="">All Breeds</MenuItem>
                {breeds.map((breed) => (
                  <MenuItem key={breed} value={breed}>
                    {breed}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                name="adoptionStatus"
                label="Adoption Status"
                value={filters.adoptionStatus || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
              >
                <MenuItem value="">All Statuses</MenuItem>
                {adoptionStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type="number"
                name="minAge"
                label="Min Age (years)"
                value={filters.minAge ?? ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                inputProps={{ min: 0 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type="number"
                name="maxAge"
                label="Max Age (years)"
                value={filters.maxAge ?? ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon size={18} />}
              onClick={handleClear}
              disabled={Object.keys(filters).length === 0}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Filter size={18} />}
            >
              Apply Filters
            </Button>
          </Box>
        </form>
      </Collapse>
    </Paper>
  );
};

export default CatFilter;