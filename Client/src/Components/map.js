import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  SkeletonText,
  color,
} from '@chakra-ui/react';
import { geolocated } from "react-geolocated";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  InfoWindow,
} from '@react-google-maps/api';

import { FaLocationArrow, FaTimes, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import busStopImage from './Bus_Stop.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const center = { lat: 6.7967578, lng: 79.88875 }

const busStops = [
  { lat: 6.797515, lng: 79.8890265, busStopName: 'Katubadda Junction Bus Stop', routeNo: '255' },
  { lat: 6.796813, lng: 79.893839, busStopName: 'Pansala Bus Stop', routeNo: '255' },
  { lat: 6.795623, lng: 79.8984756, busStopName: 'UOM Bus Stop', routeNo: '255' },
];

function Map() {

  //load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAmD_c6_Rnaee2j6iNcY8raxvGCMrNS3NU",
    libraries: ['places'],

  })


  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [currentLocationObtained, setCurrentLocationObtained] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  //loading animation that indicates that the application is waiting for the API to load
  if (!isLoaded) {
    return <SkeletonText />
  }

  //set up the Autocomplete component(implement the search functionality)
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  //handle the place search functionality
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedPlace(place.geometry.location.toJSON());
        setInputValue(place.formatted_address);
        if (map !== null) {
          map.panTo(place.geometry.location);
          map.setZoom(16);
        }
      } else {
        console.log('No results found');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  //clear the searched place and it's marker
  const clearSelectedPlace = () => {
    setSelectedPlace(null);
    if (map != null) {
      map.panTo(center);
      map.setZoom(13);
    }
    setInputValue('');

  }




  //get the user's current location using navigator.geolocation API
  async function handleCurrentLocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });

      if (map !== null) {
        map.panTo({ lat: latitude, lng: longitude });
        map.setZoom(17);
      }

      setCurrentLocationObtained(true); // Set the currentLocationObtained state to true
      setShowClearButton(true); // Set showClearButton to true
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } catch (error) {
      console.log("Unable to retrieve your location:", error);
    }
  }

  //clear the location and it's marker
  const clearCurrentLocation = () => {
    setCurrentLocation(null);
    if (map != null) {
      map.panTo(center);
      map.setZoom(13);
    }
  }

  /*
  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success,error);
      }
      else {
      console.log("Geolocation is not supported by this browser.");
    }
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  setCurrentLocation({ lat: latitude, lng: longitude });
  if (map !== null) {
    map.panTo({ lat: latitude, lng: longitude });
    map.setZoom(17);
  }
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
}

function error() {
  console.log("Unable to retrieve your location");
}
*/

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='87vh'
      w='80vw'
    >
      <Box position='absolute' left={0} right={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={13}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Box position='absolute' left={2} top={1} h='50px' w='250px'>

            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              {/* Search Bar */}
              <InputGroup>
                <Input type="text"
                  placeholder='Search Places...'
                  backgroundColor='white'
                  px={5}
                  py={1}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  _focus={{
                    outline: 'none',
                    boxShadow: 'outline',
                  }}
                />

                {selectedPlace && (
                  <InputRightElement>
                    <IconButton
                      aria-label='Clear search'
                      icon={<FaTimes />}
                      variant='ghost'
                      size='sm'
                      onClick={clearSelectedPlace}

                    />

                  </InputRightElement>
                )}
                <InputLeftElement>
                  <IconButton
                    aria-label='Search'
                    icon={<FaSearch />}
                    variant='ghost'
                    size='sm'
                  />
                </InputLeftElement>
              </InputGroup>
            </Autocomplete>
          </Box>


          {/*button that allows users to get their current location */}


          <Box position='absolute' top={2} right={2} zIndex={1}>
            <Button
              onClick={handleCurrentLocation}
              bg='blue.200'
              color='black.600'
              leftIcon={<FaLocationArrow />}
            >
              Get Location
            </Button>
            {showClearButton && ( // Render the "Clear Location" button if showClearButton is true
    <Button
      onClick={() => {
        clearCurrentLocation();
        setShowClearButton(false); // Set showClearButton to false on click
      }}
      bg="blue.200"
      color="black.600"
      leftIcon={<FaTimes />}
    >
    </Button>
  )}
          </Box>
          {/* display the bus stops on the map */}
          {busStops.map((busStop) => (
            <Marker key={busStop.busStopName} position={{ lat: busStop.lat, lng: busStop.lng }}
              icon={{
                url: busStopImage,
                scaledSize: new window.google.maps.Size(15, 15),
              }} onClick={async () => {

                try {
                  const response = await axios.get(`http://localhost:8080/api/v1/bus-locations/nearby/${busStop.lng}/${busStop.lat}`);
                  const filteredBuses = response.data;
                  const busStopName = busStop.busStopName;
                  const routeNO = busStop.routeNo;
                  setBuses(filteredBuses);
                  console.log(filteredBuses);
                  navigate('/searchbus/filteredbus', { state: { filteredBuses, busStopName, routeNO } });
                } catch (error) {
                  console.error('Error fetching data: ', error);
                }
              }}
              onMouseOver={() => {
                setSelectedMarker(busStop);
              }}
              onMouseOut={() => {
                setSelectedMarker(null);
              }}>
              {selectedMarker === busStop && (
                <InfoWindow>
                  <div >
                    {busStop.busStopName}
                    <div>
                      {busStop.routeNo}
                    </div>
                  </div>
                </InfoWindow>
              )}

            </Marker>

          ))}

          {/* Selected Place Marker */}
          {selectedPlace && (
            <Marker
              position={selectedPlace}
            />
          )}

          {/* Selected current location Marker */}
          {currentLocation && (
            <Marker
              position={currentLocation}
            />
          )}

        </GoogleMap>
      </Box>
    </Flex>
  )
}

export default Map;