package com.example.demo.service;

import com.example.demo.model.DriverAttendance;
import com.example.demo.repository.DriverAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverAttendanceService {

    @Autowired
    private DriverAttendanceRepository driverAttendanceRepository;


    public List<DriverAttendance> findAll() {
        return driverAttendanceRepository.findAll();
    }
}