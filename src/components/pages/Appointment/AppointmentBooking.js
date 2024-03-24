import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid, Button, Typography, Card, CardContent, TextField } from '@mui/material';
import dayjs from 'dayjs';

function DoctorDetails() {
    const { doctorId } = useParams(); // Get the doctor ID from URL parameters
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [doctor, setDoctor] = useState({ name: '', specialty: '', area: '' });

    // Fetch doctor details
    useEffect(() => {
        const fetchDoctorDetails = async () => {
            // Replace with your actual API call
            const response = await fetch(`http://localhost:8080/doctors/${doctorId}`);
            if (!response.ok) {
                console.error('Failed to fetch doctor details');
                return;
            }
            const data = await response.json();
            setDoctor(data);
        };

        fetchDoctorDetails();
    }, [doctorId]);

    // Fetch available hours when a date is selected
    useEffect(() => {
        const fetchAvailableHours = async () => {
            if (!selectedDate) return;

            const formattedDate = selectedDate.format('YYYY-MM-DD');
            // Replace with your actual API call
            const response = await fetch(`http://localhost:8080/doctors/${doctorId}/available-slots?date=${formattedDate}`);
            if (!response.ok) {
                console.error('Failed to fetch available hours');
                return;
            }
            const hours = await response.json();
            setAvailableHours(hours);
        };

        fetchAvailableHours();
    }, [doctorId, selectedDate]);

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
                            />
                            <Typography variant="h6" style={{ marginTop: '20px' }}>Available Hours:</Typography>
                            {availableHours.length > 0 ? (
                                <Grid container spacing={2}>
                                    {availableHours.map((hour, index) => (
                                        <Grid item key={index}>
                                            <Button variant="outlined">{hour}</Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography>No available slots for this date.</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}

export default DoctorDetails;
