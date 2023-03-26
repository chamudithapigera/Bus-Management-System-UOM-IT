package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.Driver;
import com.example.demo.model.Turn;
import com.example.demo.repository.TurnRepository;
import com.example.demo.service.TurnService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.convert.DurationFormat;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private TurnRepository turnRepository;


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

    @GetMapping("/{id}")
    Turn getTurnById(@PathVariable ObjectId id){
        return turnRepository.findById(id)
                .orElseThrow(()->new NotFoundException(("Turn not found with id: " + id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Turn> updateTurn(@PathVariable("id") ObjectId id, @RequestBody Turn turn) {
        Turn updatedTurn = turnService.updateTurn(id, turn);
        return ResponseEntity.ok(updatedTurn);
    }

    @DeleteMapping("/deleteTurn/{id}")
    String deleteTurn(@PathVariable ObjectId id){
        if (!turnRepository.existsById(id)){
            throw new NotFoundException(("Bus Route not found with id: " + id));
        }
        turnRepository.deleteById(id);
        return "Bus Route with id " +id+ "has been deleted";

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
