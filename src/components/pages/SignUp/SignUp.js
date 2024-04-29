import React, { useState, useEffect } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Dayjs from "dayjs";
import AddressInput from "../../Address/AddressInput";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});
  const [area, setArea] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    formattedAddress: "",
    lat: null,
    lng: null,
  });

  useEffect(() => {
    // Clear errors when userType changes
    setErrors({});
  }, [userType]);

  const handleLocationSelect = (location) => {
    setSelectedLocation({
      formattedAddress: location.formattedAddress,
      lat: location.lat,
      lng: location.lng,
    });

    const addressParts = location.formattedAddress.split(", ");
    if (addressParts.length > 1) {
      const cityZipPart = addressParts[1];
      const match = cityZipPart.match(/^(.*?)(?=\d)/);
      if (match && match[0]) {
        setArea(match[0].trim());
      } else {
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

  const validateFields = (data) => {
    let newErrors = {};
    const fieldsToValidate =
      userType === "doctor"
        ? [
            "socialSecurityNumber",
            "name",
            "password",
            "specialty",
            "contactDetails",
          ]
        : ["socialSecurityNumber", "name", "password", "contactDetails"];

    fieldsToValidate.forEach((field) => {
      console.log(field);
      if (!data.get(field)) {
        newErrors[field] = "This field is required";
      }
      if (userType === "doctor"&&(
        !selectedLocation.formattedAddress ||
        !validateAddress(selectedLocation.formattedAddress))
      ) {
        newErrors["formattedAddress"] = "Please select a valid address.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Helper function to validate address
  const validateAddress = (address) => {
    return address && address.length > 10;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validateFields(data)) {
      console.error("Validation errors:", errors);
      return;
    }

    // Convert Dayjs objects to strings in the required format
    const formattedWorkingHours = Object.keys(workingHours).reduce(
      (acc, key) => {
        const day = key.replace(/Start|End/, ""); // Extract day part (e.g., "monday")
        const startOrEnd = key.endsWith("Start") ? "startTime" : "endTime"; // Determine if it's start or end time
        const timeString = workingHours[key].format("HH:mm"); // Format Dayjs object to string

        // Initialize the day object if it doesn't exist
        if (!acc[day]) acc[day] = { dayOfWeek: day.toUpperCase() };
        // Set start or end time
        acc[day][startOrEnd] = timeString;

        return acc;
      },
      {}
    );

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
    const endpoint =
      userType === "doctor"
        ? "http://localhost:8080/doctors/signup"
        : "http://localhost:8080/patients/signup";
    try {
      console.log(formData);
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
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>User Type</InputLabel>
            <Select
              value={userType}
              label="User Type"
              onChange={handleUserTypeChange}
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              {userType === "doctor" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Social Security Number"
                      name="socialSecurityNumber"
                      required
                      sx={{ mb: 2 }}
                      error={!!errors.socialSecurityNumber}
                      helperText={errors.socialSecurityNumber}
                    />
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      required
                      sx={{ mb: 2 }}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      required
                      sx={{ mb: 2 }}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                    <TextField
                      fullWidth
                      label="Specialty"
                      name="specialty"
                      required
                      sx={{ mb: 2 }}
                      error={!!errors.specialty}
                      helperText={errors.specialty}
                    />
                    <TextField
                      fullWidth
                      label="Contact Details"
                      name="contactDetails"
                      required
                      sx={{ mb: 2 }}
                      error={!!errors.contactDetails}
                      helperText={errors.contactDetails}
                    />

                    <AddressInput
                      onLocationSelect={handleLocationSelect}
                      error={!!errors.formattedAddress}
                      helperText={
                        errors.formattedAddress ||
                        "Please select a valid address."
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Grid container spacing={2}>
                        {Object.entries(workingHours).map(([key, value]) => (
                          <Grid item xs={6} key={key}>
                            <TimePicker
                              label={`${key.split(/(?=[A-Z])/).join(" ")} Time`}
                              value={value}
                              onChange={(newValue) =>
                                handleTimeChange(newValue, key)
                              }
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </LocalizationProvider>
                  </Grid>
                </>
              )}
              {userType === "patient" && (
                <>
                  <TextField
                    fullWidth
                    label="Social Security Number"
                    name="socialSecurityNumber"
                    required
                    sx={{ mb: 2 }}
                    error={!!errors.socialSecurityNumber}
                    helperText={errors.socialSecurityNumber}
                  />
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    required
                    sx={{ mb: 2 }}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    required
                    sx={{ mb: 2 }}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  <TextField
                    fullWidth
                    label="Contact Details"
                    name="contactDetails"
                    required
                    sx={{ mb: 2 }}
                    error={!!errors.contactDetails}
                    helperText={errors.contactDetails}
                  />
                </>
              )}
            </Grid>
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
