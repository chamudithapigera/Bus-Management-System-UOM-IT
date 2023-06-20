package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusRepository;
import com.example.demo.service.BusService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/bus_detail")
@CrossOrigin(origins = "http://localhost:3000")
public class BusController {

    @Autowired
    private BusService busService;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private MongoTemplate mongoTemplate;



    @PostMapping("/addBus")
    public ResponseEntity<Bus> createBus(@RequestBody Map<String, String> payload){

        return new ResponseEntity<Bus>(busService.createBusBy(payload.get("busID"),payload.get("capacity")), HttpStatus.CREATED);
    }


    //get all document data of collection
    @GetMapping("/viewBus")
    public List<Bus> findAllBusesWithDetails() {
        return mongoTemplate.findAll(Bus.class);
    }

    //get one document data of collection
    @GetMapping("/{id}")
    Bus getBusById(@PathVariable ObjectId id){
        return busRepository.findById(id)
                .orElseThrow(()->new NotFoundException(("Bus Route not found with id: " + id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable("id") ObjectId id, @RequestBody Bus bus) {
        Bus updatedBus = busService.updateBus(id, bus);
        return ResponseEntity.ok(updatedBus);
    }

    @DeleteMapping("/deleteBus/{id}")
    String deleteBus(@PathVariable ObjectId id){
        if (!busRepository.existsById(id)){
            throw new NotFoundException(("Bus  not found with id: " + id));
        }
        busRepository.deleteById(id);
        return "Bus  with id " +id+ "has been deleted";

    }

    //get count of busses
    @GetMapping("/count")
    public int geBusCount() {
        return busService.getBusCount();
    }










    //delete data of busRote field by matching given busRouteID
    @DeleteMapping("/deleteBusRoute/{busId}/{id}")
    String deleteBusRoute(@PathVariable ObjectId busId, @PathVariable String id) {
        Optional<Bus> optionalBus = busRepository.findById(busId);
        if (!optionalBus.isPresent()) {
            throw new NotFoundException("Bus not found with id: " + busId);
        }
        Bus bus = optionalBus.get();
        List<BusRoute> busRoutes = bus.getBusRoute();
        boolean removed = busRoutes.removeIf(route -> route.getId().equals(id));
        if (removed) {
            bus.setBusRoute(busRoutes);
            busRepository.save(bus);
            return "Bus route with id " + id + " deleted from bus with id " + busId;
        } else {
            return "Bus route with id " + id + " not found in bus with id " + busId;
        }
    }

    //delete data of busStop field by matching given busStopID
    @DeleteMapping("/deleteBusStop/{busId}/{id}")
    String deleteBusStop(@PathVariable ObjectId busId, @PathVariable String id) {
        Optional<Bus> optionalBus = busRepository.findById(busId);
        if (!optionalBus.isPresent()) {
            throw new NotFoundException("Bus not found with id: " + busId);
        }
        Bus bus = optionalBus.get();
        List<BusStop> busStops = bus.getBusStop();
        boolean removed = busStops.removeIf(stop -> stop.getId().equals(id));
        if (removed) {
            bus.setBusStop(busStops);
            busRepository.save(bus);
            return "Bus stop with id " + id + " deleted from bus with id " + busId;
        } else {
            return "Bus stop with id " + id + " not found in bus with id " + busId;
        }
    }




    @DeleteMapping("/busRoute/{id}")
    public ResponseEntity<String> deleteBusRoute(@PathVariable("id") String id) {
        try {
            List<Bus> buses = busRepository.findAll();
            for (Bus bus : buses) {
                List<BusRoute> busRoutes = bus.getBusRoute();
                for (BusRoute busRoute : busRoutes) {
                    if (busRoute.getId().equals(id)) {
                        busRoutes.remove(busRoute);
                        bus.setBusRoute(busRoutes);
                        busRepository.save(bus);
                        return ResponseEntity.status(HttpStatus.OK).body("Bus route with ID " + id + " has been deleted successfully.");
                    }
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bus route with ID " + id + " does not exist.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting bus route with ID " + id + ": " + e.getMessage());
        }
    }







}