import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
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

const ContactTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const { userId, userType } = useAuth();
  const [filter, setFilter] = useState("all"); // Possible values: "all", "week", "month"
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentTime);
      const now = new Date();
      const startOfWeek = now.getDate() - now.getDay();
      const endOfWeek = startOfWeek + 6;
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      switch (filter) {
        case "week":
          return (
            appointmentDate >= new Date(now.setDate(startOfWeek)) &&
            appointmentDate <= new Date(now.setDate(endOfWeek))
          );
        case "month":
          return (
            appointmentDate >= startOfMonth && appointmentDate <= endOfMonth
          );
        default:
          return true;
      }
    });
    setFilteredAppointments(filtered);
  }, [appointments, filter]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userId) return; // Do not fetch if userId is not available
      try {
        const response = await fetch(
          `http://localhost:8080/appointments/${userType}/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        console.log(data);
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, [userId]); // Fetch appointments whenever userId changes

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/appointments/${appointmentId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      // Remove the appointment from the local state to update UI
      setAppointments(
        appointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setFilter("all")}>
          All
        </Button>
        <Button
          variant="contained"
          onClick={() => setFilter("week")}
          sx={{ mx: 1 }}
        >
          This Week
        </Button>
        <Button variant="contained" onClick={() => setFilter("month")}>
          This Month
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredAppointments.map((appointment) => {
          const appointmentDate = new Date(appointment.appointmentTime);
          const date = appointmentDate.toLocaleDateString();
          const time = appointmentDate.toLocaleTimeString();

          return (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <CustomCard elevation={10}>
                <CustomCardContent>
                  <TitleTypography variant="h5">
                    {userType === "doctor"
                      ? appointment.patientName
                      : appointment.doctorName}
                  </TitleTypography>
                  <ContactTypography>Date: {date}</ContactTypography>
                  <ContactTypography>Time: {time}</ContactTypography>
                  <ContactTypography>
                    Reason: {appointment.reason}
                  </ContactTypography>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => deleteAppointment(appointment.id)}
                  >
                    Cancel
                  </Button>
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
