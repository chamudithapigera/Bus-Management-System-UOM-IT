package com.example.demo.controller;

import com.example.demo.model.BusLocation;
import com.example.demo.repository.BusLocationRepository;
import com.example.demo.service.BusLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bus-locations")
public class BusLocationController {

    @Autowired
    private BusLocationRepository busLocationRepository;

    @Autowired
    private BusLocationService busLocationService;

    @GetMapping("/view")
    public List<BusLocation> getAllBusLocations() {
        return busLocationRepository.findAll();
    }


    @PostMapping("/save")
    public ResponseEntity<?> saveBusLocation(@RequestBody BusLocation busLocation) {
        busLocationService.saveBusLocation(busLocation);
        return ResponseEntity.ok("Bus location saved successfully");
    }

}
