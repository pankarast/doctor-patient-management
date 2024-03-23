import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const { login } = useAuth(); // Use the login function from context

  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const formData = {
        email: data.get('email'),
        password: data.get('password'),
        socialSecurityNumber: data.get('socialSecurityNumber'),
        name: data.get('name'),
        contactDetails: data.get('contactDetails'),
    };
  
    try {
        const response = await fetch('http://localhost:8080/patients/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
  
        if (response.ok) {
            // Handle successful response
            console.log('Form data submitted successfully');
            navigate('/'); // Redirect to homepage on success
            // try {
            //   await login(formData.socialSecurityNumber, formData.password); // Assuming login() is now an async function
            //   navigate('/'); // Redirect to homepage on success
            // } catch (error) {
            //   // Handle login error (e.g., show an error message)
            //   console.error("Login failed:", error);
            // }
        } else {
            // Handle unsuccessful response
            console.error('Form submission failed:', response.statusText);
        }
    } catch (error) {
        // Handle network error
        console.error('Error submitting form data:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="socialSecurityNumber"
                label="Social Security Number"
                id="socialSecurityNumber"
                
            />
              </Grid>
              <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                id="name"
                
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contactDetails"
                  label="Contact Details"
                  id="contactDetails"
                 
                />
              </Grid>
              </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
              <Link component={RouterLink} to="/sign-in" variant="body2">
              {"Already have an account? Sign in"}
            </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}