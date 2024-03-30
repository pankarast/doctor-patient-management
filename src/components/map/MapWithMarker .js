import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapWithMarker = ({ location }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  // Default to a fallback location if none provided
  const defaultCenter = {
    lat: 39.0742, // Example default: center of Greece
    lng: 21.8243,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCCF695YKHRUe3Vc09908DFyqBh_yGOzlw">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location || defaultCenter}
        zoom={13}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithMarker;
