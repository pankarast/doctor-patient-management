import React, { useState } from 'react';
import { useAuth } from './AuthContext'; 
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  backgroundColor: theme.palette.background.paper,
  transition: "transform 0.15s ease-in-out",
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

const ContactTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const { userId } = useAuth();

  const fetchAppointments = async () => {
    if (!userId) return;
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

  return (
    <Box sx={{ mt: 4 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={fetchAppointments}
      >
        Fetch Appointments
      </Button>
      <Grid container spacing={3}>
        {appointments.map((appointment) => {
          // Parse appointmentTime as a Date object
          const appointmentDate = new Date(appointment.appointmentTime);
          // Format date and time
          const date = appointmentDate.toLocaleDateString();
          const time = appointmentDate.toLocaleTimeString();

          return (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <CustomCard elevation={10}>
                <CustomCardContent>
                  <TitleTypography variant="h5">
                    Appointment ID: {appointment.id}
                  </TitleTypography>
                  <ContactTypography>
                    Date: {date}
                  </ContactTypography>
                  <ContactTypography>
                    Time: {time}
                  </ContactTypography>
                  <ContactTypography>
                    Reason: {appointment.reason}
                  </ContactTypography>
                  <Button variant="contained">Cancel</Button>
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
