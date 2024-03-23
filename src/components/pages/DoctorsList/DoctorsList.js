import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const CustomCard = styled(Card)(({ theme }) => ({
    maxWidth: 345, // Adjust card size
    backgroundColor: theme.palette.background.paper, // Use theme colors for adaptability
    transition: "transform 0.15s ease-in-out", // Smooth transition for hover effect
    "&:hover": {
        transform: "scale3d(1.05, 1.05, 1)"
    }
}));

const CustomCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    gap: theme.spacing(1),
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
}));

const SpecialtyTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary
}));

const ContactTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetch('http://localhost:8080/doctors')
          .then(response => response.json())
          .then(data => setDoctors(data))
          .catch(error => console.error("There was an error!", error));
  }, []);

  const handleAppointmentClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };

  return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
              {doctors.map(doctor => (
                  <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                      <CustomCard elevation={10}>
                          <CustomCardContent>
                              <TitleTypography variant="h5" component="div">
                                  {doctor.name}
                              </TitleTypography>
                              <SpecialtyTypography>
                                  Specialty: {doctor.specialty}
                              </SpecialtyTypography>
                              <ContactTypography >
                                  Number: {doctor.contactDetails}
                              </ContactTypography>
                              <ContactTypography >
                                  Area: {doctor.area}
                              </ContactTypography>
                              <Button variant="contained" onClick={() => handleAppointmentClick(doctor.id)}>Book Appointment</Button>
                          </CustomCardContent>
                      </CustomCard>
                  </Grid>
              ))}
          </Grid>
      </Box>
  );
}

export default DoctorsList;
