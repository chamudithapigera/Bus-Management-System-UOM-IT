import React, { useRef, useEffect,useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';



const Map = () => {
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2F2aW5kaWphZGEiLCJhIjoiY2xlY2xsYzVkMTQ1cDN4bzkyNGV6aGVqdSJ9.N8yW47-jPEVwn6mJuGnxZA';
    const map = new mapboxgl.Map({
      container: 'map-Container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [79.888752, 6.797505],
      zoom: 12
    });

    
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });
    map.addControl(geocoder);

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    map.addControl(geolocate,'bottom-right');

    const busStops = [

        {
          busStopName: 'Katubadda Junction Bus Stop',
          lngLat: [79.888752, 6.797505]
        },
        {
          busStopName: 'Pansala Bus Stop',
          lngLat: [79.893444, 6.797006]
        },
        {
          busStopName: 'UOM Bus Stop',
          lngLat: [79.898603, 6.795643]
        },
        {
          busStopName: 'MolpeRoad Bus Stop',
          lngLat: [79.900949, 6.794931]
        }
      ];

      busStops.forEach(({ busStopName, lngLat }) => {

        // create the popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(busStopName);
  
        // Add a marker in the UOM bus halt.
        const marker = new mapboxgl.Marker({
          element: createMarkerElement(lngLat)
        })
          .setLngLat(lngLat)
          .setPopup(popup) // sets a popup on this marker
          .addTo(map)
    
      
      
      });
  
      
  
      

      function createMarkerElement(lngLat) {
        const el = document.createElement('div');
        el.style.backgroundImage = 'url(https://thumbs.dreamstime.com/b/blue-bus-stop-sign-flat-vector-icon-blue-bus-stop-sign-simple-flat-rectangular-vector-icon-isolated-117547895.jpg)';
        el.style.backgroundSize = 'cover';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
    
        return el;
      }
    
  }, []);

  return (
    <div>
       <div id="map-Container" style={{ height: "100vh", width: "85vw" }} />
    </div>
  );
};

export default Map;
