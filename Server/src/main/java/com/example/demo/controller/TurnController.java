package com.example.demo.controller;

import com.example.demo.model.Driver;
import com.example.demo.model.Turn;
import com.example.demo.service.TurnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/turn")
public class TurnController {
    @Autowired
    private TurnService turnService;

    @GetMapping("/present/driverIds")
    public List<String> getPresentDriverIdsSortedByCheckInTime() {
        return turnService.getPresentDriverIdsSortedByCheckInTime();
    }

    @PostMapping("/addTurn")
    public String saveTurn(@RequestBody Turn turn){
        turnService.save(turn);
        return "Trun saved successfully...";
    }

    @GetMapping("/viewTurn")
    public List<Turn> findAllTurnsWithDetails() {
        return turnService.findAll();
    }


}
