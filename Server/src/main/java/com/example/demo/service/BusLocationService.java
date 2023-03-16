package com.example.demo.service;

import com.example.demo.model.BusLocation;
import com.example.demo.repository.BusLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class BusLocationService {

    @Autowired
    private BusLocationRepository busLocationRepository;

    @Scheduled(fixedDelay = 60000)
    public void updateBusLocation() {
        // Use a service like Google Maps to get the current location of the bus
        double latitude = 37.4224764;
        double longitude = -122.0842499;
        BusLocation busLocation = new BusLocation();
        busLocation.setLatitude(latitude);
        busLocation.setLongitude(longitude);
        busLocation.setTimestamp(new Date());
        busLocationRepository.save(busLocation);
    }
}
