import React from "react";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  width: '80vw',
  margin: '40px auto 20px',
  height: '70vh',
};

const center = {
  // conestoga Waterloo (lat- long): (43.4791627023587, -80.51826602698976)
  lat: 43.4791627023587,
  lng: -80.51826602698976,
};

const TeamMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDLeUHNGB9hfHXwa0ekjRFUk6_Smz5HvDk',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={18}
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  </div>
  );
};

export default TeamMap;