package com.example.demo.controller;

import com.example.demo.model.Passenger;
import com.example.demo.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


    @CrossOrigin("http://localhost:3000")
    @RestController
    @RequestMapping("/api/v1/passenger")
    public class PassengerController {




        @Autowired
        private PassengerService passengerService;

        @PostMapping("/addPassenger")
        public String saveTurn(@RequestBody Passenger passenger){
            passengerService.save(passenger);
            return "Passenger saved successfully...";
        }




        @GetMapping("/viewPassenger")
        public List<Passenger> findAllPassengersWithDetails() {
            return passengerService.findAll();
        }


    }






