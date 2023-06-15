package com.travo.travo.controller;

import com.travo.travo.model.DriverAttendance;
import com.travo.travo.service.DriverAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DriverAttendanceController {

    @Autowired
    private DriverAttendanceService driverAttendanceService;
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/attendance")
    public ResponseEntity<DriverAttendance> markAttendance(@RequestBody DriverAttendance attendance) {
        DriverAttendance savedAttendance = driverAttendanceService.markAttendance(attendance.getDriverID(), attendance.getStatus());
        return new ResponseEntity<>(savedAttendance, HttpStatus.CREATED);
    }
}
