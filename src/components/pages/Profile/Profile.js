import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import { Button, TextField, Grid, Box, Snackbar, Alert } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Dayjs from "dayjs";
import AddressInput from "../../Address/AddressInput";

function Profile() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: "",
    severity: "success", // or 'error', 'warning', 'info'
  });

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarInfo({ message, severity });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const { userType, userId, updateUserName } = useAuth();
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

  const [userData, setUserData] = useState({
    socialSecurityNumber: "",
    name: "",
    password: "",
    specialty: "",
    contactDetails: "",
  });
  const [resetAddressInput, setResetAddressInput] = useState(false);

  const [errors, setErrors] = useState({});

  const [area, setArea] = useState("");

  const [selectedLocation, setSelectedLocation] = useState({
    formattedAddress: "",
    lat: null,
    lng: null,
  });

  const handleLocationSelect = (location) => {
    // Keep the selected location in its original format, without modifying it
    setSelectedLocation({
      formattedAddress: location.formattedAddress,
      lat: location.lat,
      lng: location.lng,
    });

    // Split the formatted address to extract parts
    const addressParts = location.formattedAddress.split(", ");

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
      if (!data.get(field)) {
        newErrors[field] = "This field is required";
      }
      if (
        userType === "doctor" &&
        (!selectedLocation.formattedAddress ||
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

  const resetFormFields = () => {
    setResetAddressInput(true); // Toggle to trigger useEffect in AddressInput
    // Reset all your state here
    setUserData({
      socialSecurityNumber: "",
      name: "",
      password: "",
      specialty: "",
      contactDetails: "",
    });
    setWorkingHours({
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
    setSelectedLocation({
      formattedAddress: "",
      lat: null,
      lng: null,
    });
    setArea("");
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validateFields(data)) {
      handleSnackbarOpen(
        "Validation failed. Please check the form fields.",
        "error"
      );
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
    const endpoint = `http://localhost:8080/${userType}s/${userId}`;

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        handleSnackbarOpen("Form data submitted successfully.", "success");
        const newName = data.get("name"); // Get the new name from the form
        updateUserName(newName); // Update the userName in context and session storage
        resetFormFields();
      } else {
        handleSnackbarOpen(
          `Form submission failed: ${response.statusText}`,
          "error"
        );
      }
    } catch (error) {
      handleSnackbarOpen(
        `Error submitting form data: ${error.message}`,
        "error"
      );
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {userType === "doctor" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="AMKA"
                name="socialSecurityNumber"
                required
                value={userData.socialSecurityNumber}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    socialSecurityNumber: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
                error={!!errors.socialSecurityNumber}
                helperText={errors.socialSecurityNumber}
              />
              <TextField
                fullWidth
                label="Name"
                name="name"
                required
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
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
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                sx={{ mb: 2 }}
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                fullWidth
                label="Specialty"
                name="specialty"
                required
                value={userData.specialty}
                onChange={(e) =>
                  setUserData({ ...userData, specialty: e.target.value })
                }
                sx={{ mb: 2 }}
                error={!!errors.specialty}
                helperText={errors.specialty}
              />
              <TextField
                fullWidth
                label="Contact Details"
                name="contactDetails"
                required
                value={userData.contactDetails}
                onChange={(e) =>
                  setUserData({ ...userData, contactDetails: e.target.value })
                }
                sx={{ mb: 2 }}
                error={!!errors.contactDetails}
                helperText={errors.contactDetails}
              />

              <AddressInput
                onLocationSelect={handleLocationSelect}
                error={!!errors.formattedAddress}
                helperText={
                  errors.formattedAddress || "Please select a valid address."
                }
                resetInput={resetAddressInput}
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
                        onChange={(newValue) => handleTimeChange(newValue, key)}
                        renderInput={(params) => <TextField {...params} />}
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
              label="AMKA"
              name="socialSecurityNumber"
              required
              value={userData.socialSecurityNumber}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  socialSecurityNumber: e.target.value,
                })
              }
              sx={{ mb: 2 }}
              error={!!errors.socialSecurityNumber}
              helperText={errors.socialSecurityNumber}
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              required
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
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
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              sx={{ mb: 2 }}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              fullWidth
              label="Contact Details"
              name="contactDetails"
              required
              value={userData.contactDetails}
              onChange={(e) =>
                setUserData({ ...userData, contactDetails: e.target.value })
              }
              sx={{ mb: 2 }}
              error={!!errors.contactDetails}
              helperText={errors.contactDetails}
            />
          </>
        )}
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
        Change Data
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarInfo.severity}
          sx={{ width: "100%" }}
        >
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Profile;
