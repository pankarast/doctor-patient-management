import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from  '@mui/x-date-pickers/TimePicker';
import Dayjs from 'dayjs';
import AddressInput from '../../Address/AddressInput';

const defaultTheme = createTheme();

export default function SignUp() {

  const navigate = useNavigate(); // Hook to navigate

  const [userType, setUserType] = useState("patient");
  const defaultStartTime = Dayjs().hour(9).minute(0);
  const defaultEndTime = Dayjs().hour(17).minute(0);

  const [workingHours, setWorkingHours] = useState({
    mondayStart: defaultStartTime,
    mondayEnd: defaultEndTime,
    tuesdayStart: defaultStartTime,
    tuesdayEnd: defaultEndTime,
    wednesdayStart: defaultStartTime,
    wednesdayEnd: defaultEndTime,
    thursdayStart: defaultStartTime,
    thursdayEnd: defaultEndTime,
    fridayStart: defaultStartTime,
    fridayEnd: defaultEndTime,

  });

  const [area, setArea] = useState('');
  

  const [selectedLocation, setSelectedLocation] = useState({
    formattedAddress: '',
    lat: null,
    lng: null,
  });

  const handleLocationSelect = (location) => {
    // Keep the selected location in its original format, without modifying it
    setSelectedLocation(location);
  
    // Split the formatted address to extract parts
    const addressParts = location.formattedAddress.split(', ');
  
    if (addressParts.length > 1) {
      // Extract the part that likely contains "City ZIP"
      const cityZipPart = addressParts[1];
      
      // Use a regex to match everything up to the first sequence of digits (the ZIP code)
      const match = cityZipPart.match(/^(.*?)(?=\d)/);
  
      if (match && match[0]) {
        // If a match is found, trim it to remove any leading/trailing whitespace
        setArea(match[0].trim()); // Update the area state with the extracted city name
      } else {
        // If no digits are found, assume the entire part is the city name
        setArea(cityZipPart.trim());
      }
    }
  };
  

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleTimeChange = (newValue, key) => {
    setWorkingHours({ ...workingHours, [key]: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // Convert Dayjs objects to strings in the required format
    const formattedWorkingHours = Object.keys(workingHours).reduce((acc, key) => {
      const day = key.replace(/Start|End/, ''); // Extract day part (e.g., "monday")
      const startOrEnd = key.endsWith('Start') ? 'startTime' : 'endTime'; // Determine if it's start or end time
      const timeString = workingHours[key].format('HH:mm'); // Format Dayjs object to string
      
      // Initialize the day object if it doesn't exist
      if (!acc[day]) acc[day] = { dayOfWeek: day.toUpperCase() };
      // Set start or end time
      acc[day][startOrEnd] = timeString;

      return acc;
    }, {});

    const workingHoursArray = Object.values(formattedWorkingHours);

    const formData =
      userType === "doctor"
        ? {
            socialSecurityNumber: data.get("socialSecurityNumber"),
            name: data.get("name"),
            password: data.get("password"),
            specialty: data.get("specialty"),
            contactDetails: data.get("contactDetails"),
            area: area,
            workingHours: workingHoursArray,
            formattedAddress: selectedLocation.formattedAddress,
            longitude: selectedLocation.lng,
            latitude: selectedLocation.lat,
          }
        : {
            // Patient specific form data
            password: data.get("password"),
            socialSecurityNumber: data.get("socialSecurityNumber"),
            name: data.get("name"),
            contactDetails: data.get("contactDetails"),
          };
          const endpoint = userType === "doctor" ? "http://localhost:8080/doctors/signup" : "http://localhost:8080/patients/signup";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Form data submitted successfully");
        navigate("/");
      } else {
        // Handle unsuccessful response
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      // Handle network error
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg"> {/* Adjusted maxWidth for layout */}
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign up</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>User Type</InputLabel>
            <Select value={userType} label="User Type" onChange={handleUserTypeChange}>
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
            {userType === "doctor" && (
                <>
                  <Grid item xs={12} sm={6}> {/* Doctor details column */}
                    <TextField fullWidth label="Social Security Number" name="socialSecurityNumber" required sx={{ mb: 2 }} />
                    <TextField fullWidth label="Name" name="name" required sx={{ mb: 2 }} />
                    <TextField fullWidth id="password" label="Password" name="password" type="password" required sx={{ mb: 2 }}/>
                    <TextField fullWidth label="Specialty" name="specialty" required sx={{ mb: 2 }} />
                    <TextField fullWidth label="Contact Details" name="contactDetails" required sx={{ mb: 2 }} />
                    <div>
                      <AddressInput onLocationSelect={handleLocationSelect} />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Grid container spacing={2}> 
                        <Grid item xs={12} md={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Monday Start"
                                value={workingHours.mondayStart}
                                onChange={(newValue) => handleTimeChange(newValue, "mondayStart")}
                                timeFormat="HH:mm"
                                views={['hours','0']}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Monday End"
                                value={workingHours.mondayEnd}
                                onChange={(newValue) => handleTimeChange(newValue, "mondayEnd")}
                                views={['hours','0']}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Tuesday Start"
                                value={workingHours.tuesdayStart}
                                onChange={(newValue) => handleTimeChange(newValue, "tuesdayStart")}
                                views={['hours','0']}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Tuesday End"
                                value={workingHours.tuesdayEnd}
                                onChange={(newValue) => handleTimeChange(newValue, "tuesdayEnd")}
                                views={['hours','0']}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Wednesday Start"
                                value={workingHours.wednesdayStart}
                                onChange={(newValue) => handleTimeChange(newValue, "wednesdayStart")}
                                views={['hours','0']}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Wednesday End"
                                value={workingHours.wednesdayEnd}
                                onChange={(newValue) => handleTimeChange(newValue, "wednesdayEnd")}
                                views={['hours','0']}
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Thursday Start"
                                value={workingHours.thursdayStart}
                                onChange={(newValue) => handleTimeChange(newValue, "thursdayStart")}
                                views={['hours','0']}
                                
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Thursday End"
                                value={workingHours.thursdayEnd}
                                onChange={(newValue) => handleTimeChange(newValue, "thursdayEnd")}
                                views={['hours','0']}
                                
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Friday Start"
                                value={workingHours.fridayStart}
                                onChange={(newValue) => handleTimeChange(newValue, "fridayStart")}
                                views={['hours','0']}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TimePicker
                                label="Friday End"
                                value={workingHours.fridayEnd}
                                onChange={(newValue) => handleTimeChange(newValue, "fridayEnd")}
                                views={['hours','0']}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </LocalizationProvider>
                  </Grid>
                </>
              )}
            </Grid>
            {userType === "patient" && (
                <>
                  <TextField
                    fullWidth
                    label="Social Security Number"
                    name="socialSecurityNumber"
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField                  
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  required
                  sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Contact Details"
                    name="contactDetails"
                    required
                    sx={{ mb: 2 }}
                  />
                </>
              )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
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
