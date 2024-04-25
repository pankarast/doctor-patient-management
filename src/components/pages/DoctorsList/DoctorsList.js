import React, { useState } from "react";
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
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

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

const containerStyle = {
  width: '100%',
  height: '400px',
};

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState("");
  const [area, setArea] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false); // New state to control rendering
  const navigate = useNavigate();

  const [activeMarker, setActiveMarker] = useState(null); // Track which marker is active

  const mapCenter = {
    lat: 37.9838, // Default center, you may want to dynamically adjust this based on the doctors' locations
    lng: 23.7275,
  };

  const handleMarkerClick = (doctorId) => {
    setActiveMarker(doctorId); // Set the active marker to the doctor's ID
  };

  const fetchDoctors = () => {
    const url = new URL("http://localhost:8080/doctors");
    if (specialty) url.searchParams.append("specialty", specialty);
    if (area) url.searchParams.append("area", area);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setSearchPerformed(true); // Set flag to true only after successful fetch
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setSearchPerformed(false); // Optionally reset flag on error
      });
  };

  const handleSearchClick = () => {
    fetchDoctors();
    console.log("Search clicked!");
  };

  const handleAppointmentClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Search Filters */}
      <FormGroup row>
      <FormControl fullWidth margin="normal">
        <InputLabel>Specialty</InputLabel>
        <Select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          label="Specialty"
        >
          <MenuItem value={"Cardiology"}>Cardiology</MenuItem>
          <MenuItem value={"Dermatology"}>Dermatology</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Area</InputLabel>
        <Select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          label="Area"
        >
          <MenuItem value={"Athina"}>Athina</MenuItem>
          <MenuItem value={"Nea Smirni"}>Nea Smirni</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSearchClick}>
        Search
      </Button>
    </FormGroup>

      {/* Conditionally Render DoctorsList after Search */}
      {searchPerformed && (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {doctors.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                <CustomCard elevation={10}>
                  <CustomCardContent>
                    <TitleTypography variant="h5" component="div">
                      {doctor.name}
                    </TitleTypography>
                    <SpecialtyTypography>
                      Specialty: {doctor.specialty}
                    </SpecialtyTypography>
                    <ContactTypography>
                      Number: {doctor.contactDetails}
                    </ContactTypography>
                    <ContactTypography>Area: {doctor.area}</ContactTypography>
                    <ContactTypography>Address: {doctor.formattedAddress}</ContactTypography>
                    <Button
                      variant="contained"
                      onClick={() => handleAppointmentClick(doctor.id)}
                    >
                      Book Appointment
                    </Button>
                  </CustomCardContent>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Conditionally Render Google Map displaying doctors */}
      {searchPerformed && (
              <Box sx={{ mt: 4, mb: 4 }}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapCenter}
                  zoom={13}
                >
                  {doctors.map((doctor) => (
                    <Marker
                      key={doctor.id}
                      position={{ lat: doctor.latitude, lng: doctor.longitude }}
                      onClick={() => handleMarkerClick(doctor.id)}
                    >
                      {activeMarker === doctor.id && (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                          <div>
                            <h2>{doctor.name}</h2>
                            <p>Specialty: {doctor.specialty}</p>
                            <p>Address: {doctor.formattedAddress}</p>
                            {/* You can include any additional details here */}
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
                </GoogleMap>
              </Box>
            )}
    </Box>
  );
}

export default DoctorsList;