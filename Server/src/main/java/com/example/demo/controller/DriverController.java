package com.example.demo.controller;

import com.example.demo.model.Driver;
import com.example.demo.service.DriverService;
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

    @PostMapping("/addDriver")
    public ResponseEntity<Driver> createDriver(@RequestBody Map<String, String> payload){

        return new ResponseEntity<Driver>(driverService.createDriverBy(payload.get("driverID"),payload.get("driverName"),payload.get("licenseNo"),payload.get("busID")), HttpStatus.CREATED);
    }

    @GetMapping("/viewDriver")
    public ResponseEntity<List<Driver>> getAllDrivers(){
        return new ResponseEntity<List<Driver>>(driverService.allDrivers(), HttpStatus.OK);
    }

}