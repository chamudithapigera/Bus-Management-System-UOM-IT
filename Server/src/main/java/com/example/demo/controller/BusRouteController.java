package com.example.demo.controller;

import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusRouteRepository;
import com.example.demo.service.BusRouteService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/busRoute")
public class BusRouteController {

    @Autowired
    private BusRouteService busRouteService;

    @Autowired
    private BusRouteRepository busRouteRepository;

    @PostMapping("/addRoute")
    public ResponseEntity<BusRoute> createBusRoute(@RequestBody Map<String, String> payload){

        return new ResponseEntity<BusRoute>(busRouteService.createBusRouteBy(payload.get("routeID"),payload.get("routeNO"),payload.get("routeName"),payload.get("busID")), HttpStatus.CREATED);
    }

    @GetMapping("/viewBusRoute")
    public List<BusRoute> findAllBusRoutesWithDetails() {
        return busRouteService.findAll();
    }

    @PutMapping("/updatebusRoute/{r_id}")
    public ResponseEntity<String> updateBusRoute(@PathVariable("r_id") ObjectId r_id, @RequestBody BusRoute busRoute) {
        Optional<BusRoute> optionalBusRoute = busRouteRepository.findById(r_id);
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
    }



}