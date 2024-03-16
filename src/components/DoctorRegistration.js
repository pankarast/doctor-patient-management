import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const DoctorRegistration = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    amka: '',
    name: '',
    specialty: '',
    contact: '',
    area: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doctorInfo);
    // Here you would typically send this data to your backend server
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Doctor Registration</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="AMKA"
          variant="outlined"
          fullWidth
          margin="normal"
          name="amka"
          value={doctorInfo.amka}
          onChange={handleChange}
        />
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={doctorInfo.name}
          onChange={handleChange}
        />
        <TextField
          label="Specialty"
          variant="outlined"
          fullWidth
          margin="normal"
          name="specialty"
          value={doctorInfo.specialty}
          onChange={handleChange}
        />
        <TextField
          label="Contact Details"
          variant="outlined"
          fullWidth
          margin="normal"
          name="contact"
          value={doctorInfo.contact}
          onChange={handleChange}
        />
        <TextField
          label="Area"
          variant="outlined"
          fullWidth
          margin="normal"
          name="area"
          value={doctorInfo.area}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
};

export default DoctorRegistration;
