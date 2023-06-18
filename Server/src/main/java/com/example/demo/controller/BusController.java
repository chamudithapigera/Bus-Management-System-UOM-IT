package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.model.Driver;
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



    // add bus data to collection
    /* @PostMapping("/addBus")
    public String saveBus(@RequestBody Bus bus){
        busService.save(bus);
        return "Bus saved successfully...";
    }*/

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
    public ResponseEntity<Bus> updateBus(@PathVariable("id") ObjectId id, @RequestBody Bus bus,String busID) {
        Bus updatedBus = busService.updateBus(id, bus,busID);
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

    //delete data of driver field by matching given driverID
    @DeleteMapping("/deleteDriver/{busId}/{id}")
    String deleteDriver(@PathVariable ObjectId busId, @PathVariable String id) {
        Optional<Bus> optionalBus = busRepository.findById(busId);
        if (!optionalBus.isPresent()) {
            throw new NotFoundException("Bus not found with id: " + busId);
        }
        Bus bus = optionalBus.get();
        List<Driver> drivers = bus.getDriver();
        boolean removed = drivers.removeIf(dri -> dri.getId().equals(id));
        if (removed) {
            bus.setDriver(drivers);
            busRepository.save(bus);
            return "Driver with id " + id + " deleted from bus with id " + busId;
        } else {
            return "Driver with id " + id + " not found in bus with id " + busId;
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

    //get count of busses
    @GetMapping("/count")
    public long geBusCount() {
        return busService.getBusCount();
    }








/* @PutMapping("/{id}/update-bus-stop/{stopId}")
    public Bus updateBusStop(@PathVariable("id") ObjectId busId, @PathVariable("stopId") ObjectId stopId, @RequestBody BusStop busStop) {
        return busService.updateBusStop(busId, stopId, busStop);
    }*/

   /* @PutMapping("/{busId}/bus-stop/{busStopId}")
    public ResponseEntity<?> updateBusStop(@PathVariable ObjectId busId, @PathVariable ObjectId busStopId, @RequestBody BusStop busStop) {
        //Bus updatedBus = busService.updateBusStop(busId, busStopId, busStop);
        //return ResponseEntity.ok(updatedBus);
        Optional<BusStop> busStopData = busStopRepository.findById(new ObjectId(busStopId.getDate()));

        if (busStopData.isPresent()) {
            BusStop _busStop = busStopData.get();
            _busStop.setBusStopID(busStop.getBusStopID());
            _busStop.setBusStopName(busStop.getBusStopName());
            _busStop.setLongitude(busStop.getLongitude());
            Bus updatedBus = null;
            List<Bus> buses = busRepository.findAll();

            // loop through all buses to update the busStop field if the busStop exists
            for (Bus bus : buses) {
                List<BusStop> busStops = bus.getBusStop();
                if (busStops != null) {
                    for (int i = 0; i < busStops.size(); i++) {
                        BusStop temp = busStops.get(i);
                        if (temp.getId().toString().equals(busStopId)) {
                            temp.setBusStopID(busStop.getBusStopID());
                            temp.setBusStopName(busStop.getBusStopName());
                            temp.setLongitude(busStop.getLongitude());
                            busStops.set(i, temp);
                            updatedBus = busRepository.save(bus);
                            break;
                        }
                    }
                }
            }

            busStopRepository.save(_busStop);
            return new ResponseEntity<>(_busStop, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/

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