import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../../AuthContext";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"; // Import necessary plugin for comparison
dayjs.extend(isSameOrAfter);

function AppointmentBooking() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: "",
    severity: "error", // can be "error", "success", "info", or "warning"
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

  const { doctorId } = useParams(); // Get the doctor ID from URL parameters
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableHours, setAvailableHours] = useState([]);
  const [doctor, setDoctor] = useState({ name: "", specialty: "", area: "" });
  const { userId } = useAuth();
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      const response = await fetch(`http://localhost:8080/doctors/${doctorId}`);
      if (!response.ok) {
        console.error("Failed to fetch doctor details");
        return;
      }
      const data = await response.json();
      setDoctor(data);
    };

    fetchDoctorDetails();
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate) {
      const fetchAvailableHours = async () => {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const response = await fetch(
          `http://localhost:8080/doctors/${doctorId}/available-slots?date=${formattedDate}`
        );
        if (!response.ok) {
          console.error("Failed to fetch available hours");
          return;
        }
        let hours = await response.json();

        // Filter hours if the selected date is today
        if (dayjs().isSame(selectedDate, "day")) {
          const currentTime = dayjs().format("HH:mm");
          hours = hours.filter((hour) =>
            dayjs(hour, "HH:mm").isSameOrAfter(dayjs(currentTime, "HH:mm"))
          );
        }

        setAvailableHours(hours);
      };

      fetchAvailableHours();
    }
  }, [doctorId, selectedDate]);

  const handleSubmitAppointment = async () => {
    const appointmentData = {
      doctorId: parseInt(doctorId, 10),
      patientId: userId,
      appointmentTime: `${selectedDate.format("YYYY-MM-DD")}T${selectedTime}`,
      reason: reason,
    };
  
    try {
      const response = await fetch("http://localhost:8080/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        handleSnackbarOpen("Failed to book appointment", "error");
      } else {
        // Success feedback
        handleSnackbarOpen("Appointment booked successfully", "success");
      }
  
      // Always reset form regardless of the response
      setSelectedDate(null);
      setSelectedTime("");
      setAvailableHours([]);
      setReason(""); // Reset the reason field
    } catch (error) {
      handleSnackbarOpen("Failed to book appointment", "error");
    }
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{doctor.name}</Typography>
              <Typography variant="subtitle1">{doctor.specialty}</Typography>
              <Typography variant="subtitle2">{doctor.area}</Typography>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={setSelectedDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={dayjs()}
              />
              <FormControl fullWidth style={{ marginTop: "20px" }}>
                <InputLabel id="time-select-label">Available Hours</InputLabel>
                <Select
                  labelId="time-select-label"
                  value={selectedTime}
                  label="Available Hours"
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  {availableHours.map((hour, index) => (
                    <MenuItem key={index} value={hour}>
                      {hour}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="reason"
                  label="reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)} // Handle the change
                  autoFocus
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={handleSubmitAppointment}
                disabled={!selectedTime || !selectedDate || !reason} // Ensure a date and time are selected
              >
                Confirm Appointment
              </Button>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default AppointmentBooking;
