package com.example.demo;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class DriverAttendanceController {

    @Autowired
    private DriverAttendanceService driverAttendanceService;

    @GetMapping("/attendance")
    public ResponseEntity<List<DriverAttendance>> getAttendanceByDriverIDAndDate(
            @RequestParam(name = "driverID") String driverID, @RequestParam(name = "date") Date date) {
        List<DriverAttendance> attendanceList = driverAttendanceService.getAttendanceByDriverIDAndDate(driverID, date);
        if (attendanceList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(attendanceList, HttpStatus.OK);
        }
    }

    @PostMapping("/attendance")
    public ResponseEntity<DriverAttendance> markAttendance(@RequestBody DriverAttendance attendance) {
        DriverAttendance savedAttendance = driverAttendanceService.markAttendance(attendance.getDriverID(),
                attendance.getStatus());
        return new ResponseEntity<>(savedAttendance, HttpStatus.CREATED);
    }
}
