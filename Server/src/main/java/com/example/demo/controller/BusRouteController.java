package com.example.demo.controller;

import com.example.demo.model.BusRoute;
import com.example.demo.service.BusRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/buses")
public class BusRouteController {

    @Autowired
    private BusRouteService busRouteService;
/*
    @PostMapping("/addRoute")
    public ResponseEntity<BusRoute> createBusRoute(@RequestBody Map<String, String> payload){

        return new ResponseEntity<BusRoute>(busRouteService.createBusRouteBy(payload.get("routeID"),payload.get("routeNO"),payload.get("routeName"),payload.get("busID")), HttpStatus.CREATED);
    }
*/
}
