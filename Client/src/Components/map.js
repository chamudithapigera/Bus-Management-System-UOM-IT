import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  SkeletonText,
  Text,
  color,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes, FaSearch } from 'react-icons/fa'
import axios from 'axios';

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react';
import { navigate, useNavigate } from 'react-router-dom';



const center = { lat: 6.7967578, lng: 79.88875 }

const busStops = [
  { lat: 6.7975192, lng: 79.8890269, busStopName: 'Katubadda Junction Bus Stop', routeNo: '255'},
  { lat: 6.796842088103000, lng: 79.89383247321002, busStopName: 'Pansala Bus Stop', routeNo: '255' },
  { lat: 6.795658427700921, lng: 79.8984747855464, busStopName: 'UOM Bus Stop', routeNo: '255' },
 
];

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAmD_c6_Rnaee2j6iNcY8raxvGCMrNS3NU",
    libraries: ['places'],

  })

  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [buses, setBuses] = useState([]);





  if (!isLoaded) {
    return <SkeletonText />
  }

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setDirectionsResponse(null);
        setSelectedPlace(place.geometry.location.toJSON());
        setInputValue(place.formatted_address);
        if (map !== null) {
          map.panTo(place.geometry.location);
          map.setZoom(14);
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
    setInputValue('');
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        if (map !== null) {
          map.panTo({ lat: latitude, lng: longitude });
          map.setZoom(14);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

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
          zoom={15}
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

          <Box position='absolute' top={2} right={2} zIndex={1} >
            <Button onClick={handleCurrentLocation} bg="blue.200" color="black.600" leftIcon={<FaLocationArrow />}>
              Get Current Location
            </Button>
          </Box>

          {busStops.map((busStop) => (
            
            <Marker key={busStop.busStopName} position={busStop} onClick={ async () => {
           
              try {
                const response = await axios.get(`http://localhost:8080/api/v1/buses/getBusesByBusStopName/${busStop.busStopName}`);
                const filteredBuses = response.data;
                const busStopName = busStop.busStopName;
                setBuses(filteredBuses);
                console.log(filteredBuses);
                navigate('/searchbus/filteredbus', { state: { filteredBuses , busStopName} });
              } catch (error) {
                console.error('Error fetching data: ', error);
              }
          }} />

          ))}

          {/* Selected Place Marker */}
          {selectedPlace && (
            <Marker
              position={selectedPlace}
            />
          )}

          {currentLocation && (
            <Marker
              position={currentLocation}
            />
          )}

          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}


        </GoogleMap>
      </Box>


    </Flex>
  )
}

export default Map;