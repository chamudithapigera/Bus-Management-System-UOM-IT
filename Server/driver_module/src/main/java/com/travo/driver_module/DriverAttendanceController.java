package com.travo.driver_module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/driver-attendance")
public class DriverAttendanceController {

    private final DriverAttendanceService driverAttendanceService;

    @Autowired
    public DriverAttendanceController(DriverAttendanceService driverAttendanceService) {
        this.driverAttendanceService = driverAttendanceService;
    }

    @PostMapping("/{username}")
    public ResponseEntity<String> saveAttendance(@PathVariable String username, @RequestBody DriverAttendance request) {
        boolean isPresent = request.isPresent();
        driverAttendanceService.saveAttendance(username, isPresent);
        return ResponseEntity.ok("Attendance saved for driver: " + username);
    }
}

