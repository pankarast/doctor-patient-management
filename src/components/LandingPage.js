import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctor-Patient Appointment System
          </Typography>
          <Button color="inherit" onClick={() => navigate('/register-patient')}>Register/Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>Welcome</Typography>
        <Typography paragraph>Manage your appointments with ease.</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/register-doctor')}>Register as Doctor</Button>
          <Button variant="contained" onClick={() => navigate('/select-doctor')}>Find a Doctor</Button>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
