import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importing dayjs adapter
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid, Button, Typography, Card, CardContent, TextField } from '@mui/material';

function AppointmentBooking() {
    const { doctorId } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState(['9:00', '11:00', '14:00']);
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        // Placeholder: Replace with actual fetch request for doctor details
        setDoctor({
            name: "Dr. John Doe",
            specialty: "General Practitioner",
        });
    }, [doctorId, selectedDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">{doctor?.name}</Typography>
                            <Typography color="textSecondary">{doctor?.specialty}</Typography>
                            <DatePicker
                                label="Select Date"
                                value={selectedDate}
                                onChange={setSelectedDate}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                            <Typography variant="h6" style={{ marginTop: '20px' }}>Available Time Slots:</Typography>
                            <Grid container spacing={2}>
                                {availableHours.map((hour, index) => (
                                    <Grid item key={index}>
                                        <Button variant="outlined">{hour}</Button>
                                    </Grid>
                                ))}
                            </Grid>
                            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>Confirm Appointment</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}

export default AppointmentBooking;
