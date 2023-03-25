package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.model.Driver;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusStopRepository;
import com.example.demo.service.BusService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
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
    private BusStopRepository busStopRepository;
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

//----


   /* @PutMapping("/{id}/update-bus-stop/{stopId}")
    public Bus updateBusStop(@PathVariable("id") ObjectId busId, @PathVariable("stopId") ObjectId stopId, @RequestBody BusStop busStop) {
        return busService.updateBusStop(busId, stopId, busStop);
    }*/

    /*@DeleteMapping("/deleteBus/{id}")
    String deleteBus(@PathVariable ObjectId id){
        if (!busRepository.existsById(id)){
            throw new NotFoundException(("Bus  not found with id: " + id));
        }
        busRepository.deleteById(id);
        return "Bus  with id " +id+ "has been deleted";

    }*/

    @DeleteMapping("/bus/{busId}/busRoute/{busRouteId}")
    public ResponseEntity<?> deleteBusRouteById(@PathVariable String busId, @PathVariable String busRouteId) {
        Optional<Bus> bus = busRepository.findById(busId);
        if (bus.isPresent()) {
            Bus foundBus = bus.get();
            List<BusRoute> busRoutes = foundBus.getBusRoute();
            for (Iterator<BusRoute> iterator = busRoutes.iterator(); iterator.hasNext();) {
                BusRoute busRoute = iterator.next();
                if (busRoute.getId().equals(busRouteId)) {
                    iterator.remove();
                    busRepository.save(foundBus);
                    return ResponseEntity.ok().build();
                }
            }
        }
        return ResponseEntity.notFound().build();
    }



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