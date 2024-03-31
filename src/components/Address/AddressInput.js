import React, { useState, useCallback } from 'react';
import { TextField, Paper, List, ListItem } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';

const AddressInput = ({ onLocationSelect }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setInputValue(place.formatted_address);
      onLocationSelect({
        formattedAddress: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <TextField
          fullWidth
          required
          label="Address"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="outlined"
          margin="normal"
        />
      </Autocomplete>
    </div>
  );
};

export default AddressInput;








// import React, { useState, useEffect } from 'react';
// import { TextField, List, ListItem, Paper } from '@mui/material';

// const AddressInput = ({ onLocationSelect }) => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     if (query.length < 3) {
//       setSuggestions([]);
//       return;
//     }

//     const fetchSuggestions = async () => {
//       const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${query}`);
//       const data = await response.json();
//       setSuggestions(data);
//     };

//     const delayDebounceFn = setTimeout(() => {
//       fetchSuggestions();
//     }, 500); // Adding a 500ms debounce to limit requests

//     return () => clearTimeout(delayDebounceFn);
//   }, [query]);

//   const handleSelect = (place) => {
//     setQuery(place.display_name);
//     setSuggestions([]);
//     // Call a function passed as prop to update parent component state
//     const formattedAddress = formatAddress(place); // Assuming you write this function
//   onLocationSelect({
//     formattedAddress,
//     lat: parseFloat(place.lat),
//     lng: parseFloat(place.lon),
//   });
// };

// // Mockup function to format address based on the provided place object.
// // You will need to adjust the keys based on the actual structure of the place object.
// function formatAddress(place) {
//   const { address } = place;
//   const line1 = address.name || ''; // RECIPIENT OR CONTACT NAME
//   const line2 = `${address.road || ''} ${address.house_number || ''}`.trim(); // STREET HOUSE NUMBER
//   const line3 = `${address.postcode || ''} ${address.city || address.town || ''}`.trim(); // POSTAL CODE CITY
//   const line4 = address.country || ''; // COUNTRY
//   return `${line1}\n${line2}\n${line3}\n${line4}`;
// }

//   return (
//     <div style={{ position: 'relative', width: '100%' }}>
//       <TextField
//         fullWidth
//         label="Address"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         variant="outlined"
//         margin="normal"
//       />
//       {suggestions.length > 0 && (
//         <Paper style={{ position: 'absolute', width: '100%', zIndex: 1 }}>
//           <List>
//             {suggestions.map((place, index) => (
//               <ListItem
//                 key={index}
//                 onClick={() => handleSelect(place)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {place.display_name}
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       )}
//     </div>
//   );
// };

// export default AddressInput;
