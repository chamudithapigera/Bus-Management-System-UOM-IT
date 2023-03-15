package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class DriverAttendanceService {

    @Autowired
    private DriverAttendanceRepository driverAttendanceRepository;

    public void markAttendance(String username, boolean present) {
        DriverAttendance driverAttendance = new DriverAttendance();
        driverAttendance.setUsername(username);
        driverAttendance.setPresent(present);
        driverAttendance.setCheckInTime(LocalTime.now());
        driverAttendance.setDate(LocalDate.now());
        driverAttendanceRepository.save(driverAttendance);
    }
}
