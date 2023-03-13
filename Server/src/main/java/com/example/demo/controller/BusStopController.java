package com.example.demo.controller;

import com.example.demo.model.BusStop;
import com.example.demo.service.BusStopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/buses")
public class BusStopController {

    @Autowired
    private BusStopService busStopService;

    @PostMapping("/addBusStop")
    public ResponseEntity<BusStop> createBusStop(@RequestBody Map<String, String> payload){

        return new ResponseEntity<BusStop>(busStopService.createBusStopBy(payload.get("busStopName"),payload.get("longitude"),payload.get("busID")), HttpStatus.CREATED);
    }

}
