package com.example.demo.controller;

import com.example.demo.model.BusLocation;
import com.example.demo.model.BusLocationWithDistanceAndDuration;
import com.example.demo.repository.BusLocationRepository;
import com.example.demo.service.BusLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bus-locations")
@CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
public class BusLocationController {

    @Autowired
    private BusLocationRepository busLocationRepository;

    @Autowired
    private BusLocationService busLocationService;

    @GetMapping("/view")
    public List<BusLocation> getAllBusLocations() {
        return busLocationRepository.findAll();
    }

    @GetMapping("/nearby/{longitude}/{latitude}")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<BusLocationWithDistanceAndDuration> getNearbyBuses(@PathVariable("longitude") double longitude, @PathVariable("latitude") double latitude) {
        return busLocationService.getNearbyBuses(longitude, latitude);
    }
    /*
    public ResponseEntity<List<BusLocation>> getNearbyBuses(@PathVariable("longitude") double longitude,
                                                            @PathVariable("latitude") double latitude) {

        List<BusLocation> nearbyBuses = busLocationService.getNearbyBuses(longitude, latitude);

        return ResponseEntity.ok().body(nearbyBuses);
    }
*/

    @PostMapping("/save")
    public ResponseEntity<?> saveBusLocation(@RequestBody BusLocation busLocation) {
        busLocationService.saveBusLocation(busLocation);
        return ResponseEntity.ok("Bus location saved successfully");
    }

}
