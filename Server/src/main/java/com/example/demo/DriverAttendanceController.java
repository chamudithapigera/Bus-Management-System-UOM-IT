package com.example.demo;



import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/driver")
public class DriverAttendanceController {

    @Autowired
    private DriverAttendanceRepository driverAttendanceRepository;

    @PostMapping("/attendance/{username}")
    public ResponseEntity<String> markAttendance(@PathVariable String username) {
        DriverAttendance attendance = driverAttendanceRepository.findByUsernameAndDate(username, new Date());
        if(attendance != null) {
            return new ResponseEntity<>("Attendance already marked for today", HttpStatus.OK);
        }
        DriverAttendance newAttendance = new DriverAttendance();
        driverAttendanceRepository.save(newAttendance);
        return new ResponseEntity<>("Attendance marked successfully", HttpStatus.OK);
    }

    @GetMapping("/attendance/{username}")
    public ResponseEntity<DriverAttendance> getAttendance(@PathVariable String username) {
        DriverAttendance attendance = driverAttendanceRepository.findByUsernameAndDate(username, new Date());
        if(attendance == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(attendance, HttpStatus.OK);
    }
}
