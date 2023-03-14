package com.example.demo.controller;

import com.example.demo.model.Bus;

import com.example.demo.repository.BusRepository;
import com.example.demo.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/buses")
@CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
public class BusController {

    @Autowired
    private BusService busService;

    @Autowired
    private BusRepository busRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addBus")
    public String saveBus(@RequestBody Bus bus){
        busService.save(bus);
        return "Bus saved successfully...";
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/viewBus")
    public List<Bus> findAllBusesWithDetails() {
        return mongoTemplate.findAll(Bus.class);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getBusesByBusStopName/{busStopName}")
    public List<Bus> findBusesByBusStopName(@PathVariable("busStopName") String busStopName) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("busStopID.busStopName").is(busStopName))
        );
        AggregationResults<Bus> results = mongoTemplate.aggregate(aggregation, "buses", Bus.class);
        return results.getMappedResults();
    }


}



