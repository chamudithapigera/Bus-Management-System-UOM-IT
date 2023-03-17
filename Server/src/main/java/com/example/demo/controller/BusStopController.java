package com.example.demo.controller;

import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusStopRepository;
import com.example.demo.service.BusStopService;
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
@RequestMapping("/api/v1/busStop")
public class BusStopController {

    @Autowired
    private BusStopService busStopService;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private BusStopRepository busStopRepository;

    @PostMapping("/addBusStop")
    public ResponseEntity<BusStop> createBusStop(@RequestBody Map<String, String> payload){

        return new ResponseEntity<BusStop>(busStopService.createBusStopBy(payload.get("busStopName"),payload.get("longitude"),payload.get("busID")), HttpStatus.CREATED);
    }

    @GetMapping("/viewBusStop")
    public List<BusStop> findAllBusStopsWithDetails() {
        return busStopService.findAll();
    }

    @PutMapping("/updatebusStop/{s_id}")
    public ResponseEntity<String> updateBusStop(@PathVariable("s_id") ObjectId r_id, @RequestBody BusStop busStop) {
        Optional<BusStop> optionalBusStop = busStopRepository.findById(r_id);
        if (optionalBusStop.isPresent()) {
            BusStop existingBusStop = optionalBusStop.get();
            existingBusStop.setBusStopName(busStop.getBusStopName());
            existingBusStop.setLongitude(busStop.getLongitude());

            busStopRepository.save(existingBusStop);
            //busRepository.save(existingBusStop);
            return new ResponseEntity<>("BusStop updated successfully...", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("BusStop not found...", HttpStatus.NOT_FOUND);
        }
    }

}
