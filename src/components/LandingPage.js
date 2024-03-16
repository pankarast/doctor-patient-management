import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Link, Paper } from '@mui/material';

const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctor-Patient Appointment System
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Menu/Navigation - Adjust as needed */}
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', boxShadow: 3, margin: 2, padding: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Link href="#" underline="none">
              Home
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" underline="none">
              About
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" underline="none">
              Services
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" underline="none">
              Contact
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Welcome to Our Appointment System
        </Typography>
        <Typography variant="body1" paragraph>
          Here you can book your appointments with doctors effortlessly. Use the navigation links to get started.
        </Typography>
      </Container>

      {/* Footer */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: 1, textAlign: 'center', boxShadow: 3 }}>
        <Typography variant="body2">
          © 2024 Doctor-Patient Appointment System
        </Typography>
      </Paper>
    </div>
  );
};

export default LandingPage;
