import React from 'react';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';

const appointments = [
  { date: '2024-03-20', time: '10:00', doctor: 'Dr. Smith', reason: 'Routine Checkup' },
  // Add more sample appointments
];

const AppointmentList = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>My Appointments</Typography>
      <List>
        {appointments.map((appointment, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${appointment.date} at ${appointment.time}`} secondary={`${appointment.doctor} - ${appointment.reason}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AppointmentList;
