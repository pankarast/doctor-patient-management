import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

const PatientRegistration = () => {
  const [patientInfo, setPatientInfo] = useState({
    amka: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(patientInfo);
    // Send data to your backend server for registration/login
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Patient Registration / Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="AMKA"
          variant="outlined"
          fullWidth
          margin="normal"
          name="amka"
          value={patientInfo.amka}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={patientInfo.password}
          onChange={handleChange}
        />
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button type="submit" variant="contained" color="primary">Register / Login</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PatientRegistration;
