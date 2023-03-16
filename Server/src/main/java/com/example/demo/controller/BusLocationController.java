package com.example.demo.controller;

import com.example.demo.model.BusLocation;
import com.example.demo.repository.BusLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bus-locations")
public class BusLocationController {

    @Autowired
    private BusLocationRepository busLocationRepository;

    @GetMapping("/view")
    public List<BusLocation> getAllBusLocations() {
        return busLocationRepository.findAll();
    }

    @PostMapping
    public BusLocation createBusLocation(@RequestBody BusLocation busLocation) {
        return busLocationRepository.save(busLocation);
    }
}
