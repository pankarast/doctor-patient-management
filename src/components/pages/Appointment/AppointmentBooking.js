import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid, Button, Typography, Card, CardContent, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import dayjs from 'dayjs';

function AppointmentBooking() {
    const { doctorId } = useParams(); // Get the doctor ID from URL parameters
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableHours, setAvailableHours] = useState([]);
    const [doctor, setDoctor] = useState({ name: '', specialty: '', area: '' });

    useEffect(() => {
        const fetchDoctorDetails = async () => {
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

    useEffect(() => {
        if (selectedDate) {
            const fetchAvailableHours = async () => {
                const formattedDate = selectedDate.format('YYYY-MM-DD');
                const response = await fetch(`http://localhost:8080/doctors/${doctorId}/available-slots?date=${formattedDate}`);
                if (!response.ok) {
                    console.error('Failed to fetch available hours');
                    return;
                }
                const hours = await response.json();
                setAvailableHours(hours);
            };

            fetchAvailableHours();
        }
    }, [doctorId, selectedDate]);

    const handleSubmitAppointment = async () => {
        // Example structure, adapt according to your API's requirements
        const appointmentData = {
            doctorId: parseInt(doctorId, 10), // Ensure doctorId is sent as an integer
            patientId: 1, // Replace with the actual patient ID (logged-in user's ID, for example)
            appointmentTime: `${selectedDate.format('YYYY-MM-DD')}T${selectedTime}`,
            reason: "Routine Checkup", // This could also be dynamic based on user input
        };
    
        try {
            const response = await fetch('http://localhost:8080/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }
    
            // Success feedback
            alert('Appointment booked successfully');
    
            // Reset selectedDate, selectedTime, and availableHours
            setSelectedDate(null);
            setSelectedTime('');
            setAvailableHours([]);
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment');
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
                            />
                            <FormControl fullWidth style={{ marginTop: '20px' }}>
                                <InputLabel id="time-select-label">Available Hours</InputLabel>
                                <Select
                                    labelId="time-select-label"
                                    value={selectedTime}
                                    label="Available Hours"
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                >
                                    {availableHours.map((hour, index) => (
                                        <MenuItem key={index} value={hour}>{hour}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '20px' }}
                                onClick={handleSubmitAppointment}
                                disabled={!selectedTime || !selectedDate} // Ensure a date and time are selected
                            >
                                Confirm Appointment
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}

export default AppointmentBooking;
