package com.example.demo.controller;

import com.example.demo.model.Bus;
import com.example.demo.repository.BusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/buses")
@CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
public class BusController {

    @Autowired
    private BusRepository busRepository;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public String saveBus(@RequestBody Bus bus){
        busRepository.save(bus);
        return "Bus saved successfully...";
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Bus> getBuses(){
        return busRepository.findAll();

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



