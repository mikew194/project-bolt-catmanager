import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  MenuItem,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Save, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Cat, CatFormData } from '../../types/cat';

interface CatFormProps {
  initialData?: Cat;
  onSubmit: (catData: CatFormData) => void;
  isLoading?: boolean;
  title: string;
}

const defaultCat: CatFormData = {
  name: '',
  age: 0,
  breed: '',
  color: '',
  weight: 0,
  healthStatus: 'Good',
  neutered: false,
  vaccinated: false,
  adoptionStatus: 'available',
  description: '',
  imageUrl: '',
  intakeDate: new Date().toISOString().split('T')[0],
  lastCheckup: new Date().toISOString().split('T')[0],
};

const CatForm: React.FC<CatFormProps> = ({ initialData, onSubmit, isLoading = false, title }) => {
  const [formData, setFormData] = useState<CatFormData>(initialData || defaultCat);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Common breeds for dropdown
  const commonBreeds = [
    'Domestic Shorthair',
    'Domestic Longhair',
    'Siamese',
    'Persian',
    'Maine Coon',
    'Bengal',
    'Ragdoll',
    'British Shorthair',
    'Sphynx',
    'Scottish Fold',
    'Abyssinian',
    'Norwegian Forest Cat',
    'Russian Blue',
    'Burmese',
    'Other',
  ];

  // Common colors for dropdown
  const commonColors = [
    'Black',
    'White',
    'Gray',
    'Orange',
    'Cream',
    'Brown',
    'Calico',
    'Tabby',
    'Tortoiseshell',
    'Bicolor',
    'Tricolor',
    'Colorpoint',
    'Other',
  ];

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the cat's information below. Fields marked with * are required.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Age (years)"
              name="age"
              value={formData.age}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="Breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            >
              {commonBreeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            >
              {commonColors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Weight (kg)"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/cat-image.jpg"
            />
          </Grid>

          {/* Health Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2, borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
              Health & Status
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Health Status</FormLabel>
              <RadioGroup
                row
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
              >
                <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
                <FormControlLabel value="Good" control={<Radio />} label="Good" />
                <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
                <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Adoption Status</FormLabel>
              <RadioGroup
                row
                name="adoptionStatus"
                value={formData.adoptionStatus}
                onChange={handleChange}
              >
                <FormControlLabel value="available" control={<Radio />} label="Available" />
                <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                <FormControlLabel value="adopted" control={<Radio />} label="Adopted" />
                <FormControlLabel value="foster" control={<Radio />} label="Foster" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.neutered}
                  onChange={handleChange}
                  name="neutered"
                  color="primary"
                />
              }
              label="Neutered"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.vaccinated}
                  onChange={handleChange}
                  name="vaccinated"
                  color="primary"
                />
              }
              label="Vaccinated"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Intake Date"
              name="intakeDate"
              value={formData.intakeDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Last Checkup Date"
              name="lastCheckup"
              value={formData.lastCheckup}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter details about the cat's personality, background, etc."
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                component={Link}
                to="/cats"
                variant="outlined"
                startIcon={<ArrowLeft size={18} />}
              >
                Back to Cats
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <Save size={18} />}
              >
                {isLoading ? 'Saving...' : 'Save Cat'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CatForm;