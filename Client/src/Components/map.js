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
} from '@chakra-ui/react';
import { useGeolocated } from 'react-geolocated';
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

const center = { lat: 6.7967578, lng: 79.88875 };

const busStops = [
  { lat: 6.797515, lng: 79.8890265, busStopName: 'Katubadda Junction Bus Stop', routeNo: '255' },
  { lat: 6.796813, lng: 79.893839, busStopName: 'Pansala Bus Stop', routeNo: '255' },
  { lat: 6.795623, lng: 79.8984756, busStopName: 'UOM Bus Stop', routeNo: '255' },
];

const libraries = ['places'];

function Map() {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationObtained, setCurrentLocationObtained] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAmD_c6_Rnaee2j6iNcY8raxvGCMrNS3NU",
    libraries,
  });

  if (!isLoaded) {
    return <SkeletonText />;
  }

  
// sets up a reference to the Autocomplete instance
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  //search for places on the map by typing in a search query
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

  const clearSelectedPlace = () => {
    setSelectedPlace(null);
    if (map !== null) {
      map.panTo(center);
      map.setZoom(13);
    }
    setInputValue('');
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setCurrentLocationObtained(true);
          setShowClearButton(true);
          if (map !== null) {
            map.panTo({ lat: latitude, lng: longitude });
            map.setZoom(17);
          }
        },
        (error) => {
          console.log('Error retrieving current location:', error);
          // Handle the error here
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const clearCurrentLocation = () => {
    setCurrentLocation(null);
    setCurrentLocationObtained(false);
    setShowClearButton(false);
    if (map !== null) {
      map.panTo(center);
      map.setZoom(13);
    }
  };

  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="87vh" w="80vw">
      <Box position="absolute" left={0} right={0} h="100%" w="100%">
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
          onLoad={(map) => setMap(map)}
        >
          <Box position="absolute" left={2} top={1} h="50px" w="250px">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Search Places..."
                  backgroundColor="white"
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
                      aria-label="Clear search"
                      icon={<FaTimes />}
                      variant="ghost"
                      size="sm"
                      onClick={clearSelectedPlace}
                    />
                  </InputRightElement>
                )}
                <InputLeftElement>
                  <IconButton
                    aria-label="Search"
                    icon={<FaSearch />}
                    variant="ghost"
                    size="sm"
                  />
                </InputLeftElement>
              </InputGroup>
            </Autocomplete>
          </Box>

          <Box position="absolute" top={2} right={2} zIndex={1}>
            <Button
              onClick={handleCurrentLocation}
              bg="blue.200"
              color="black.600"
              leftIcon={<FaLocationArrow />}
            >
              Get Location
            </Button>
            {showClearButton && (
              <Button
                onClick={clearCurrentLocation}
                bg="blue.200"
                color="black.600"
                leftIcon={<FaTimes />}
              >
                Clear Location
              </Button>
            )}
          </Box>

          {busStops.map((busStop) => (
            <Marker
              key={busStop.busStopName}
              position={{ lat: busStop.lat, lng: busStop.lng }}
              icon={{
                url: busStopImage,
                scaledSize: new window.google.maps.Size(15, 15),
              }}
              onClick={async () => {
                try {
                  const response = await axios.get(`http://localhost:8080/api/v1/bus-locations/nearby/${busStop.lng}/${busStop.lat}`);
                  const filteredBuses = response.data;
                  const busStopName = busStop.busStopName;
                  const routeNO = busStop.routeNo;
                  setBuses(filteredBuses);
                  console.log(filteredBuses);
                  navigate('/searchbus/filteredbus', {
                    state: { filteredBuses, busStopName, routeNO },
                  });
                } catch (error) {
                  console.error('Error fetching data: ', error);
                }
              }}
              onMouseOver={() => {
                setSelectedMarker(busStop);
              }}
              onMouseOut={() => {
                setSelectedMarker(null);
              }}
            >
              {selectedMarker === busStop && (
                <InfoWindow>
                  <div>
                    {busStop.busStopName}
                    <div>{busStop.routeNo}</div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}

          {selectedPlace && <Marker position={selectedPlace} />}

          {currentLocation && <Marker position={currentLocation} />}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default Map;