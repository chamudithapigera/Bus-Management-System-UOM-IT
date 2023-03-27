package com.example.demo.service;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.example.demo.model.DriverAttendance;
import com.example.demo.model.Turn;
import com.example.demo.repositary.DriverAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

    public Optional<Turn> driverTurn(String driverID){
        return driverAttendanceRepository.getTurnByDriverID(driverID);
    }
}
