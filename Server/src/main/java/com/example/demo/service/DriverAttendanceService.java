package com.example.demo.service;

import com.example.demo.model.DriverAttendance;
import com.example.demo.repository.DriverAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class DriverAttendanceService {

    @Autowired
    private DriverAttendanceRepository driverAttendanceRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    //get all drivers
    public List<DriverAttendance> findAll() {
        return driverAttendanceRepository.findAll();
    }

    //for home page to get count
    public int getPresentDriverCountToday() {
        LocalDate today = LocalDate.now();
        Date todayDate = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());

        // Filter by today's date and "present" status
        List<DriverAttendance> presentDrivers = driverAttendanceRepository.findByDateAndStatus(todayDate, "present");

        return presentDrivers.size();
    }

    //
    public DriverAttendance markAttendance(String driverID, String status) {
        LocalDateTime currentTime = LocalDateTime.now();
        DriverAttendance attendance = new DriverAttendance(driverID, currentTime.toLocalDate(), currentTime.toLocalTime(), status);
        return driverAttendanceRepository.save(attendance);
    }
}