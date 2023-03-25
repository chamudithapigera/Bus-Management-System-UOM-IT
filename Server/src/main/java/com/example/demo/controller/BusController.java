package com.example.demo.controller;

import com.example.demo.model.Bus;

import com.example.demo.repository.BusRepository;
import com.example.demo.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/buses")
@CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
public class BusController {

    @Autowired
    private BusService busService;

    @Autowired
    private BusRepository busRepository;

    /*
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addBus")
    public String saveBus(@RequestBody Bus bus){
        busService.save(bus);
        return "Bus saved successfully...";
    }*/

    @Autowired
    private MongoTemplate mongoTemplate;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/viewBus")
    public List<Bus> findAllBusesWithDetails() {
        return mongoTemplate.findAll(Bus.class);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getBusesByBusStopName/{busStopName}")
    public List<Bus> getBusesByBusStopName(@PathVariable String busStopName) {
        return busRepository.findByBusStopName(busStopName);
    }

}



