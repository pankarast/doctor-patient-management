import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';

const AddressAutocomplete = ({ onPlaceSelected }) => {
  const autocompleteInput = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps JavaScript API library is not loaded.');
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput.current, {
      types: ['address'], // Specify the type to return only addresses
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.error('Autocomplete\'s returned place contains no geometry');
        return;
      }
      
      setInputValue(place.formatted_address);
      onPlaceSelected({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }, []);

  return (
    <TextField
      label="Address"
      variant="outlined"
      fullWidth
      inputRef={autocompleteInput}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default AddressAutocomplete;
