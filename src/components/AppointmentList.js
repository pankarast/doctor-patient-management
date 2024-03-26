import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; 
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: 345, // Adjust card size
  backgroundColor: theme.palette.background.paper, // Use theme colors for adaptability
  transition: "transform 0.15s ease-in-out", // Smooth transition for hover effect
  "&:hover": {
    transform: "scale3d(1.05, 1.05, 1)",
  },
}));

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  gap: theme.spacing(1),
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const SpecialtyTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const ContactTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userId) return; // Do not fetch if userId is not available
      try {
        const response = await fetch(`http://localhost:8080/appointments/patient/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, [userId]); // Fetch appointments whenever userId changes

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {appointments.map((appointment) => {
          const appointmentDate = new Date(appointment.appointmentTime);
          const date = appointmentDate.toLocaleDateString();
          const time = appointmentDate.toLocaleTimeString();

          return (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <CustomCard elevation={10}>
                <CustomCardContent>
                  <TitleTypography variant="h5">
                    Appointment ID: {appointment.id}
                  </TitleTypography>
                  <ContactTypography>Date: {date}</ContactTypography>
                  <ContactTypography>Time: {time}</ContactTypography>
                  <ContactTypography>Reason: {appointment.reason}</ContactTypography>
                  <Button variant="contained" color="error" sx={{ mt: 2 }}>Cancel</Button>
                </CustomCardContent>
              </CustomCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default AppointmentList;
