package com.example.demo.controller;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.example.demo.model.Turn;
import com.example.demo.repositary.TurnRepository;
import com.example.demo.service.DriverAttendanceService;
import com.example.demo.model.DriverAttendance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;




@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api")
public class DriverAttendanceController {

    @Autowired
    private DriverAttendanceService driverAttendanceService;

    @Autowired
    private TurnRepository turnRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

//    @GetMapping("/attendance")
//    public ResponseEntity<List<DriverAttendance>> getAttendanceByDriverIDAndDate(
//            @RequestParam(name = "driverID") String driverID, @RequestParam(name = "date") Date date) {
//        List<DriverAttendance> attendanceList = driverAttendanceService.getAttendanceByDriverIDAndDate(driverID, date);
//        if (attendanceList.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } else {
//            return new ResponseEntity<>(attendanceList, HttpStatus.OK);
//        }
//    }



    @PostMapping("/attendance")
    public ResponseEntity<DriverAttendance> markAttendance(@RequestBody DriverAttendance attendance) {
        DriverAttendance savedAttendance = driverAttendanceService.markAttendance(attendance.getDriverID(),
                attendance.getStatus());
        return new ResponseEntity<>(savedAttendance, HttpStatus.CREATED);
    }

    @GetMapping("/{driverID}")
    public ResponseEntity<Optional<Turn>>  getDriverTurn(@PathVariable String driverID){
        return new ResponseEntity<Optional<Turn>>(driverAttendanceService.driverTurn(driverID),HttpStatus.OK);
    }

    @GetMapping("/view")
    public List<Turn> getAllTurns() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.ASC, "routeName"));
        List<Turn> turns = mongoTemplate.find(query, Turn.class);
        return turns;
    }

    @GetMapping("/viewTurn/{driverID}")
    public List<Turn> getAllTurns(@PathVariable String driverID) {
        return turnRepository.findTurn(driverID);
    }



}
