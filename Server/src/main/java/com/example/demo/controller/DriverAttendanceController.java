package com.example.demo.controller;

import com.example.demo.model.Bus;
import com.example.demo.model.DriverAttendance;
import com.example.demo.service.DriverAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/attendance")
public class DriverAttendanceController {

    @Autowired
    private DriverAttendanceService driverAttendanceService;

    @Autowired
    private MongoTemplate mongoTemplate;

    /*@GetMapping("/viewAttendance")
    public List<DriverAttendance> findAllAttendanceWithDetails() {
        return driverAttendanceService.findAll();
    }*/

    @GetMapping("/viewAttendance")
    public List<DriverAttendance> findAllAttendanceWithDetails() {
        return mongoTemplate.findAll(DriverAttendance.class);
    }
   /* @PostMapping("/attendance")
    public ResponseEntity<DriverAttendance> markAttendance(@RequestBody DriverAttendance attendance) {
        DriverAttendance savedAttendance = driverAttendanceService.markAttendance(attendance.getDriverID(),
                attendance.getStatus());
        return new ResponseEntity<>(savedAttendance, HttpStatus.CREATED);
    }*/
}

