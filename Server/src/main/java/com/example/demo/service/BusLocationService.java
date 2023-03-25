package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.model.BusLocation;
import com.example.demo.model.BusLocationWithDistance;
import com.example.demo.repository.BusLocationRepository;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;
import com.google.maps.model.TravelMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BusLocationService {

    @Autowired
    private BusLocationRepository busLocationRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Value("${google.maps.api.key}")
    private String googleMapsApiKey; // API key for accessing the Google Maps API


    public void saveBusLocation(BusLocation busLocation) {
        busLocationRepository.save(busLocation);
    }

/*
    public List<BusLocation> getNearbyBuses(double longitude, double latitude) {
        double radius = 100;
        // Find the latest location for each busID
        List<BusLocation> latestLocations = new ArrayList<>();
        List<String> busIDs = busLocationRepository.findDistinctBusID();
        for (String busID : busIDs) {
            BusLocation latestLocation = busLocationRepository.findTopByBusIDOrderByDateTimeDesc(busID);
            latestLocations.add(latestLocation);
        }

        // Calculate the distance between the given location and the latest location for each busID
        List<BusLocation> nearbyBuses = new ArrayList<>();
        for (BusLocation location : latestLocations) {

                // call getLongitude() method on location object
                double distance = calculateDistance(longitude, latitude, location.getLongitude(), location.getLatitude());
                if (distance <= radius) {
                    nearbyBuses.add(location);
                }

        }

        return nearbyBuses;
    }

       */

    public List<BusLocationWithDistance> getNearbyBuses(double longitude, double latitude) {
        int distanceInMeters = 1000;
        List<BusLocation> latestLocations = busLocationRepository.findLatestLocations();
        List<BusLocationWithDistance> nearbyBuses = new ArrayList<>();
        for (BusLocation location : latestLocations) {
            double distance = calculateDistance(longitude, latitude, location.getLongitude(), location.getLatitude());
            if (distance <= distanceInMeters) {
                nearbyBuses.add(new BusLocationWithDistance(location, distance));
            }
        }
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



}
