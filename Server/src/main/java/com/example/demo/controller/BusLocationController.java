package com.example.demo.controller;

import com.example.demo.model.BusLocation;
import com.example.demo.model.BusLocationWithDistanceAndDuration;
import com.example.demo.repository.BusLocationRepository;
import com.example.demo.service.BusLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//REST API controller for a Spring Boot web application
@RestController
@RequestMapping("/api/v1/bus-locations")
@CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
public class BusLocationController {

    @Autowired
    private BusLocationRepository busLocationRepository;

    @Autowired
    private BusLocationService busLocationService;


    //GET Request - returns a list of all bus locations
    @GetMapping("/view")
    public List<BusLocation> getAllBusLocations() {
        return busLocationRepository.findAll();
    }

/*
    //POST Request - saves a new bus location
    @PostMapping("/save")
    public ResponseEntity<?> saveBusLocation(@RequestBody BusLocation busLocation) {
        busLocationService.saveBusLocation(busLocation);
        return ResponseEntity.ok("Bus location saved successfully");
    }
*/

    //GET Request - returns a list of nearby buses based on the user's location
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/nearby/{longitude}/{latitude}")
    public List<BusLocationWithDistanceAndDuration> getNearbyBuses(@PathVariable("longitude") double longitude, @PathVariable("latitude") double latitude) {
        return busLocationService.getNearbyBuses(longitude, latitude);
    }



}
