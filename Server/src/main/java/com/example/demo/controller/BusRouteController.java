package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.BusRoute;
import com.example.demo.repository.BusRouteRepository;
import com.example.demo.service.BusRouteService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/busRoute")
public class BusRouteController {

    @Autowired
    private BusRouteService busRouteService;

    @Autowired
    private BusRouteRepository busRouteRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/addRoute")
    public ResponseEntity<BusRoute> createBusRoute(@RequestBody Map<String, String> payload){

        return new ResponseEntity<BusRoute>(busRouteService.createBusRouteBy(payload.get("routeID"),payload.get("routeNO"),payload.get("routeName"),payload.get("busID")), HttpStatus.CREATED);
    }

    @GetMapping("/viewBusRoute")
    public List<BusRoute> findAllBusRoutesWithDetails() {
        return busRouteService.findAll();
    }

    @GetMapping("/{id}")
    BusRoute getBusRouteById(@PathVariable ObjectId id){
        return busRouteRepository.findById(id)
                .orElseThrow(()->new NotFoundException(("Bus Route not found with id: " + id)));
    }


    /* @PutMapping("/updatebusRoute/{id}")
    public ResponseEntity<String> updateBusRoute(@PathVariable("id") ObjectId id, @RequestBody BusRoute busRoute) {
        Optional<BusRoute> optionalBusRoute = busRouteRepository.findById(id);
        if (optionalBusRoute.isPresent()) {
            BusRoute existingBusRoute = optionalBusRoute.get();
            existingBusRoute.setRouteID(busRoute.getRouteID());
            existingBusRoute.setRouteNO(busRoute.getRouteNO());
            existingBusRoute.setRouteName(busRoute.getRouteName());

          busRouteRepository.save(existingBusRoute);
            //busRepository.save(existingBusStop);
            return new ResponseEntity<>("BusRoute updated successfully...", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("BusRoute not found...", HttpStatus.NOT_FOUND);
        }
    }*/

   @PutMapping("/{id}")
    public ResponseEntity<BusRoute> updateBusRoute(@PathVariable("id") ObjectId id, @RequestBody BusRoute busRoute) {
        BusRoute updatedBusRoute = busRouteService.updateBusRoute(id, busRoute);
        return ResponseEntity.ok(updatedBusRoute);
    }

    @DeleteMapping("/deleteRoute/{id}")
    String deleteRoute(@PathVariable ObjectId id){
        if (!busRouteRepository.existsById(id)){
            throw new NotFoundException(("Bus Route not found with id: " + id));
        }
         busRouteRepository.deleteById(id);
        return "Bus Route with id " +id+ "has been deleted";

    }


   /* @DeleteMapping("/deletebusRoute/{r_id}")
    public ResponseEntity<Void> deleteBusRoute(@PathVariable("r_id") ObjectId r_id) {

         BusRoute foundBusRoute = busRouteService.findById(r_id);

        if (foundBusRoute == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        busRouteService.deleteBusRoute(r_id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }*/

    /*@DeleteMapping("/deleteRoute/{routeID}")
    public void deleteObject(@PathVariable String routeID) {
        busRouteService.deleteById(routeID);
    }*/





}