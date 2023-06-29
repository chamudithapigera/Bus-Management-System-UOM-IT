package com.example.demo.service;

import com.example.demo.model.BusLocation;
import com.example.demo.model.BusLocationWithDistanceAndDuration;
import com.example.demo.repository.BusLocationRepository;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;
import com.google.maps.model.TravelMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

//contains several methods to retrieve and manipulate bus location data.
@Service
public class BusLocationService {

    @Autowired
    private BusLocationRepository busLocationRepository;

    public void saveBusLocation(BusLocation busLocation) {
        busLocationRepository.save(busLocation);
    }

    @Value("${google.maps.api.key}")
    private String googleMapsApiKey; // API key for accessing the Google Maps API
    public List<BusLocationWithDistanceAndDuration> getNearbyBuses(double longitude, double latitude) {
        int distanceInMeters = 6000;
        List<BusLocation> latestLocations = busLocationRepository.findLatestLocations();
        List<BusLocationWithDistanceAndDuration> nearbyBuses = new ArrayList<>();
        for (BusLocation location : latestLocations) {
            double distance = calculateDistance(longitude, latitude, location.getLongitude(), location.getLatitude());
            if (distance <= distanceInMeters) {
                int duration = calculateDuration(longitude, latitude, location.getLongitude(), location.getLatitude());
                LocalDateTime arrivalTime = LocalDateTime.now().plusSeconds(duration);
                nearbyBuses.add(new BusLocationWithDistanceAndDuration(location, distance,duration,arrivalTime));
            }
        }
        nearbyBuses.sort(Comparator.comparing(BusLocationWithDistanceAndDuration::getArrivalTime));
        return nearbyBuses;
    }

    private double calculateDistance(double startLongitude, double startLatitude, double endLongitude, double endLatitude) {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(googleMapsApiKey)
                .build();
        LatLng start = new LatLng(startLatitude, startLongitude);
        LatLng end = new LatLng(endLatitude, endLongitude);
        try {
            DistanceMatrixApiRequest request = DistanceMatrixApi.newRequest(context);
            DistanceMatrix result = request.origins(start)
                    .destinations(end)
                    .mode(TravelMode.DRIVING)
                    .language("en-US")
                    .await();
            return result.rows[0].elements[0].distance.inMeters;
        } catch (Exception e) {
            throw new RuntimeException("Failed to calculate distance", e);
        }
    }

    //calculate the duration using public transit options such as buses, trains, trams, or subways
    private int calculateDuration(double startLongitude, double startLatitude, double endLongitude, double endLatitude) {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(googleMapsApiKey)
                .build();
        LatLng start = new LatLng(startLatitude, startLongitude);
        LatLng end = new LatLng(endLatitude, endLongitude);
        try {
            DistanceMatrixApiRequest request = DistanceMatrixApi.newRequest(context);
            DistanceMatrix result = request.origins(start)
                    .destinations(end)
                    .mode(TravelMode.TRANSIT)
                    .language("en-US")
                    .await();
            return (int) result.rows[0].elements[0].duration.inSeconds;
        } catch (Exception e) {
            throw new RuntimeException("Failed to calculate duration", e);
        }
    }

}
