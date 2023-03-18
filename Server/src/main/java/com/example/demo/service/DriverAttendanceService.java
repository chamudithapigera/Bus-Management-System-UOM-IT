package com.example.demo.service;

import com.example.demo.model.DriverAttendance;
import com.example.demo.repository.DriverAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class DriverAttendanceService {

    @Autowired
    private DriverAttendanceRepository driverAttendanceRepository;

    public List<DriverAttendance> getAttendanceByDriverIDAndDate(String driverID, Date date) {
        return driverAttendanceRepository.findByDriverIDAndDate(driverID, date);
    }

    public DriverAttendance markAttendance(String driverID, String status) {
        LocalDateTime currentTime = LocalDateTime.now();
        DriverAttendance attendance = new DriverAttendance(driverID, currentTime.toLocalDate(), currentTime.toLocalTime(), status);
        return driverAttendanceRepository.save(attendance);
    }
}
