package com.example.demo.controller;

import com.example.demo.model.Bus;
import com.example.demo.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/buses")
public class BusController {

    @Autowired
    private BusService busService;

    @PostMapping("/addBus")
    public String saveBus(@RequestBody Bus bus){
        busService.save(bus);
        return "Bus saved successfully...";
    }

    /*@GetMapping("/viewBus")
    public ResponseEntity<List<Bus>> getAllBuses(){
        return new ResponseEntity<List<Bus>>(busService.allBuses(), HttpStatus.OK);
    }*/

    @GetMapping("/viewBus/{busID}")
    public ResponseEntity<Optional<Bus>> getSingleBus(@PathVariable String busID){
        return new ResponseEntity<Optional<Bus>>(busService.singleBus(busID), HttpStatus.OK);
    }


}
