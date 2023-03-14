package com.example.demo.controller;


import com.example.demo.model.Bus;
import com.example.demo.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/bus_detail")
public class BusController {

    @Autowired
    private BusService busService;

    @Autowired
    private  MongoTemplate mongoTemplate;

    @PostMapping("/addBus")
    public String saveBus(@RequestBody Bus bus){
        busService.save(bus);
        return "Bus saved successfully...";
    }

    @GetMapping("/viewBus")
    public List<Bus> findAllBusesWithDetails() {
        return busService.findAll();
    }
    /*@GetMapping("/viewBus")
    public List<Bus> findAllBusesWithDetails() {
        return mongoTemplate.findAll(Bus.class);
    }*/

    /*@GetMapping("/viewBus")
    public ResponseEntity<List<Bus>> getAllBuses(){
        return new ResponseEntity<List<Bus>>(busService.allBuses(), HttpStatus.OK);
    }*/

    @GetMapping("/viewBus/{busID}")
    public ResponseEntity<Optional<Bus>> getSingleBus(@PathVariable String busID){
        return new ResponseEntity<Optional<Bus>>(busService.singleBus(busID), HttpStatus.OK);
    }

   /* @DeleteMapping("/bus/{busID}")
    public ResponseEntity<?> deleteBus(@PathVariable("busID") String busID) {
        busService.deleteBusById(busID);
        return ResponseEntity.ok().build();
    }*/



}
