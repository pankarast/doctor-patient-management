import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";

const AddressInput = ({ onLocationSelect, error, helperText }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        setInputValue(place.formatted_address);
        onLocationSelect({
          formattedAddress: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.error("No valid place information found.");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <TextField
          fullWidth
          required
          label="Address"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="outlined"
          margin="normal"
          error={error}
          helperText={helperText}
        />
      </Autocomplete>
    </div>
  );
};

export default AddressInput;
