import React from "react";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const TeamMap=() =>{
    const containerStyle = {
        width: '100%',
        height: '400px'
      };
    
      const center = {
        lat:  43.4799,
        lng: -80.5342
      };
    
      return (
        <LoadScript googleMapsApiKey="AIzaSyDSuKTaoZrR2dGPkq8rbgXpv61lP3xHXMY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      );
};

export default TeamMap;