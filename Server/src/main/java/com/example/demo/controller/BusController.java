package com.example.demo.controller;

import com.example.demo.model.Bus;
import com.example.demo.model.Driver;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusStopRepository;
import com.example.demo.service.BusService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/bus_detail")
@CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
public class BusController {

    @Autowired
    private BusService busService;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/addBus")
    public String saveBus(@RequestBody Bus bus){
        busService.save(bus);
        return "Bus saved successfully...";
    }

   @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/viewBus")
    public List<Bus> findAllBusesWithDetails() {
        return mongoTemplate.findAll(Bus.class);
    }
    //public List<Bus> findAllBusesWithDetails() {
        //return busService.findAll();}


    @PutMapping("/updatebus/{id}")
    public ResponseEntity<String> updateBus(@PathVariable("id") ObjectId id, @RequestBody Bus bus) {
        Optional<Bus> optionalBus = busRepository.findById(id);
        if (optionalBus.isPresent()) {
            Bus existingBus = optionalBus.get();
            existingBus.setBusID(bus.getBusID());
            existingBus.setCapacity(bus.getCapacity());
            existingBus.setDriver(bus.getDriver());
            existingBus.setBusRoute(bus.getBusRoute());
            existingBus.setBusStop(bus.getBusStop());
            busRepository.save(existingBus);
            return new ResponseEntity<>("Bus updated successfully...", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Bus not found...", HttpStatus.NOT_FOUND);
        }
    }
   /* @PutMapping("/updatebus/{id}")
    Optional<Bus> updateBus(@RequestBody Bus newBus, @PathVariable String id){
        return busRepository.findBusBybusID(id)
                .map(bus ->{
                    bus.setBusID(newBus.getBusID());
                    bus.setCapacity(newBus.getCapacity());
                    bus.setDriver(newBus.getDriver());
                    bus.setBusRoute(newBus.getBusRoute());
                    bus.setBusRoute(newBus.getBusRoute());
                    bus.setBusStop(newBus.getBusStop());
                    return busRepository.save(bus);
                });
    }*/


}