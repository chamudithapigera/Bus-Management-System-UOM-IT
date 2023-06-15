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

//defines the initial center coordinates of the map 
const center = { lat: 6.7967578, lng: 79.88875 }

const busStops = [
  { lat: 6.797515, lng: 79.8890265, busStopName: 'Katubadda Junction Bus Stop', routeNo: '255' },
  { lat: 6.796813, lng: 79.893839, busStopName: 'Pansala Bus Stop', routeNo: '255' },
  { lat: 6.795623, lng: 79.8984756, busStopName: 'UOM Bus Stop', routeNo: '255' },
];



function UnRegMap() {

  //load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAmD_c6_Rnaee2j6iNcY8raxvGCMrNS3NU",
    libraries: ['places'],

  })

  //state variables
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
    //checks wheather Autocomplete component is loaded or not
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      //check wheather selected place has valid geometry or not
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
    //clear the input field
    setInputValue('');

  }





  //get the user's current location using navigator.geolocation API
  async function handleCurrentLocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      //If the position is successfully obtained, the latitude and longitude values are extracted from the position.coords object
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


  return (
    <Flex
      position='relative'
      // items will be stacked vertically in a column
      flexDirection='column'
      alignItems='center'
      h='88vh'
      w='98vw'
    >
      {/* used to create a positioned and sized box within the parent <Flex> container */}
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

          //Provides a callback function that is invoked when the map has finished loading
          onLoad={map => setMap(map)}
        >
          <Box position='absolute' left={2} top={1} h='50px' w='200px'>

            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              {/* Search Bar */}
              <InputGroup>
                <Input type="text"
                  placeholder='Search Places...'
                  backgroundColor='white'
                  //paddings
                  px={5}
                  py={1}
                  value={inputValue}
                  // updates the inputValue state with the new value entered by the user
                  onChange={(event) => setInputValue(event.target.value)}

                />


                {selectedPlace && (
                  <InputRightElement>
                    <IconButton
                      aria-label='Clear search'
                      icon={<FaTimes />}
                      //transparent appearance
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
          <Box position='absolute' top={2} right={2} >
            <Button
              onClick={handleCurrentLocation}
              bg='blue.200'
              color='black.600'
              leftIcon={<FaLocationArrow />}
            >
              Get Location
            </Button>
            {showClearButton && ( 
              // Render the "Clear Location" button if showClearButton is true
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
            //return marker component over the map
            <Marker key={busStop.busStopName} position={{ lat: busStop.lat, lng: busStop.lng }}
              icon={{
                url: busStopImage,
                scaledSize: new window.google.maps.Size(15, 15),
              }} onClick={async () => {

                try {
                  //sends a GET request to the specified URL using Axios(including parameteres as lat and lan)
                  const response = await axios.get(`http://localhost:8080/api/v1/bus-locations/nearby/${busStop.lng}/${busStop.lat}`);
                  const filteredBuses = response.data;
                  const busStopName = busStop.busStopName;
                  const routeNO = busStop.routeNo;
                  setBuses(filteredBuses);
                  console.log(filteredBuses);
                  //navigate to the destination and pass the data to the destination
                  navigate('/searchbus/unregfilteredbus', { state: { filteredBuses, busStopName, routeNO } });

                } catch (error) {
                  //error during the data fetching proces
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


export default UnRegMap;