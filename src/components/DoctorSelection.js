import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Container, Typography } from '@mui/material';

const DoctorSelection = () => {
  const [selection, setSelection] = useState({
    specialty: '',
    area: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelection(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Select Doctor</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Specialty</InputLabel>
          <Select
            value={selection.specialty}
            onChange={handleChange}
            name="specialty"
          >
            {/* Map through specialties after fetching them from backend */}
            <MenuItem value="Cardiology">Cardiology</MenuItem>
            <MenuItem value="Dermatology">Dermatology</MenuItem>
            {/* Add more specialties */}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Area</InputLabel>
          <Select
            value={selection.area}
            onChange={handleChange}
            name="area"
          >
            {/* Map through areas */}
            <MenuItem value="Athens">Athina</MenuItem>
            <MenuItem value="Thessaloniki">Thessaloniki</MenuItem>
            {/* Add more areas */}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Search</Button>
      </form>
    </Container>
  );
};

export default DoctorSelection;
