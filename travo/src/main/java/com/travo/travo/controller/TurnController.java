package com.travo.travo.controller;

import com.travo.travo.model.Turn;
import com.travo.travo.service.TurnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turns")
public class TurnController {

    private final TurnService turnService;

    @Autowired
    public TurnController(TurnService turnService) {
        this.turnService = turnService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{driverId}")
    public ResponseEntity<List<Turn>> getTurns(@PathVariable String driverId) {
        List<Turn> turns = turnService.getTurnsByDriverId(driverId);
        return ResponseEntity.ok(turns);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{id}/start")
    public ResponseEntity<Turn> startTurn(@PathVariable String id) {
        Turn updatedTurn = turnService.startTurn(id);
        return ResponseEntity.ok(updatedTurn);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{id}/end")
    public ResponseEntity<Turn> endTurn(@PathVariable String id) {
        Turn updatedTurn = turnService.endTurn(id);
        return ResponseEntity.ok(updatedTurn);
    }
    @CrossOrigin(origins = "http://localhost:3000")
@PatchMapping("/{id}/startpoint")
public ResponseEntity<Turn> setStartPoint(@PathVariable String id, @RequestBody String startPoint) {
    Turn updatedTurn = turnService.setStartPoint(id, startPoint);
    return ResponseEntity.ok(updatedTurn);
}

@CrossOrigin(origins = "http://localhost:3000")
@PatchMapping("/{id}/endpoint")
public ResponseEntity<Turn> setEndPoint(@PathVariable String id, @RequestBody String endPoint) {
    Turn updatedTurn = turnService.setEndPoint(id, endPoint);
    return ResponseEntity.ok(updatedTurn);
}

@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/{id}/startpoint")
public ResponseEntity<String> getStartPoint(@PathVariable String id) {
    String startPoint = turnService.getStartPoint(id);
    return ResponseEntity.ok(startPoint);
}

@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/{id}/endpoint")
public ResponseEntity<String> getEndPoint(@PathVariable String id) {
    String endPoint = turnService.getEndPoint(id);
    return ResponseEntity.ok(endPoint);
}
}
