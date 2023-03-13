import React, { useRef, useEffect,useState } from 'react';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Table from './Table.js';
//import '../css/Home.css'
import api from './api.js';



const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [FilteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2F2aW5kaWphZGEiLCJhIjoiY2xlY2xsYzVkMTQ1cDN4bzkyNGV6aGVqdSJ9.N8yW47-jPEVwn6mJuGnxZA';
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [79.888752, 6.797505],
      zoom: 12
    });

    
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });
    map.current.addControl(geocoder);

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'bottom-right');

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    map.current.addControl(geolocate,'bottom-right');

    const busStops = [

        {
          haltName: 'Katubadda Junction Bus Stop',
          lngLat: [79.888752, 6.797505]
        },
        {
          haltName: 'Pansala Bus Stop',
          lngLat: [79.893444, 6.797006]
        },
        {
          haltName: 'UOM Bus Stop',
          lngLat: [79.898603, 6.795643]
        },
        {
          haltName: 'MolpeRoad Bus Stop',
          lngLat: [79.900949, 6.794931]
        }
      ];

      busStops.forEach(({ haltName, lngLat }) => {

        // create the popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(haltName);
  
        // Add a marker in the UOM bus halt.
        const marker = new mapboxgl.Marker({
          element: createMarkerElement(lngLat)
        })
          .setLngLat(lngLat)
          .setPopup(popup) // sets a popup on this marker
          .addTo(map.current)
    
          // add click event listener to the marker element
          marker.getElement().addEventListener('click', () => {
            const handleClick = (haltName) => {
              api.get(`/getBusbyHaltName/${haltName}`).then(res => {
                setFilteredBuses(res.data);
                console.log(res.data);
              })
            };
            
            handleClick(haltName);
          });
  
      
  
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
      <div ref={mapContainer} style={{ height: '100vh'}} />
      {FilteredBuses.length > 0 && <Table data={FilteredBuses} />}
    </div>
  );
};

export default Map;
