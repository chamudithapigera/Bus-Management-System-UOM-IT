package com.example.demo.controller;

import com.example.demo.model.Driver;
import com.example.demo.model.Turn;
import com.example.demo.repository.TurnRepository;
import com.example.demo.service.TurnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.convert.DurationFormat;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/turn")
public class TurnController {
    @Autowired
    private TurnService turnService;

    @Autowired
    private MongoTemplate mongoTemplate;

    //@Autowired
   // private TurnRepository turnRepository;

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
    public List<Turn> getAllTurns() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.ASC, "routeName"));
        List<Turn> turns = mongoTemplate.find(query, Turn.class);
        return turns;
    }





/*  @GetMapping("/viewTurn")
    public List<Turn> findAllTurnsWithDetails() {
        return turnService.findAll();
    }*/
  /*@GetMapping("/viewTurn")
  public List<Turn> getAllTurnsSortedByTime() {
      List<Turn> turns = turnRepository.findAll(Sort.by(Sort.Direction.ASC, "turnTime"));
      return turns;
  }*/
}
