package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.model.Driver;
import com.example.demo.repository.DriverRepository;
import com.example.demo.service.DriverService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @Autowired
    private DriverRepository driverRepository;

    @PostMapping("/addDriver")
    public ResponseEntity<Driver> createDriver(@RequestBody Map<String, String> payload){

        return new ResponseEntity<Driver>(driverService.createDriverBy(payload.get("driverID"),payload.get("driverName"),payload.get("licenseNo"),payload.get("busID")), HttpStatus.CREATED);
    }

    @GetMapping("/viewDriver")
    public List<Driver> findAllDriversWithDetails() {
        return driverService.findAll();
    }

    @GetMapping("/{id}")
    Driver getDriverById(@PathVariable ObjectId id){
        return driverRepository.findById(id)
                .orElseThrow(()->new NotFoundException(("Driver not found with id: " + id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable("id") ObjectId id, @RequestBody Driver driver) {
        Driver updatedDriver = driverService.updateDriver(id, driver);
        return ResponseEntity.ok(updatedDriver);
    }

    @DeleteMapping("/deleteDriver/{id}")
    String deleteDriver(@PathVariable ObjectId id){
        if (!driverRepository.existsById(id)){
            throw new NotFoundException(("Driver not found with id: " + id));
        }
        driverRepository.deleteById(id);
        return "Driver with id " +id+ "has been deleted";

    }
}