package com.example.demo.controller;

import com.example.demo.model.Bus;
import com.example.demo.repository.BusRepository;

import com.example.demo.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
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


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addBus")
    public String saveBus(@RequestBody Bus bus){
        busService.save(bus);
        return "Bus saved successfully...";
    }


    @GetMapping("/viewBus")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Bus>> getAllBuses(){
        return new ResponseEntity<List<Bus>>(busService.allBuses(), HttpStatus.OK);
    }

    @Autowired
    private MongoTemplate mongoTemplate;


    @GetMapping("getBusbyBusID/{busID}")
    @CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
    public List<Bus> findBusesByBusID(@PathVariable String busID) {
        Query query = new Query();
        query.addCriteria(Criteria.where("busID").is(busID));
        return mongoTemplate.find(query, Bus.class);
    }

    @GetMapping("getBusbyHaltName/{haltName}")
    @CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
    public List<Bus> findBusesByHaltName(@PathVariable String haltName) {
        Query query = Query.query(Criteria.where("busHalts.haltName").is(haltName));
        List<Bus> buses = mongoTemplate.find(query, Bus.class);
        return buses;
    }

    @GetMapping("getBusesByLocation/{lngLat}")
    @CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
    public List<Bus> findBusesByLocation(@PathVariable String lngLat) {
        Query query = Query.query(Criteria.where("busHalts").elemMatch(Criteria.where("lngLat").is(lngLat)));
        List<Bus> buses = mongoTemplate.find(query, Bus.class);
        return buses;
    }
}



