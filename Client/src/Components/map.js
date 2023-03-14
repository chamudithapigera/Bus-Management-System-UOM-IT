import React, { useRef, useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import Table from './Table.js';
//import '../css/Home.css'
import api from './api.js';

const libraries = ["places"];

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 43.6532,
  lng: -79.3832,
};

export default function Map() {


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";



  return(
    <div>
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} ></GoogleMap>
  </div>
  );
 
}

