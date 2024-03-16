import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const AppointmentBooking = () => {
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(appointment);
    // Here you would send the appointment info to your backend
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Book Appointment</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          name="date"
          value={appointment.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Time"
          type="time"
          variant="outlined"
          fullWidth
          margin="normal"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Reason for Appointment"
          variant="outlined"
          fullWidth
          margin="normal"
          name="reason"
          value={appointment.reason}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">Book</Button>
      </form>
    </Container>
  );
};

export default AppointmentBooking;
