package com.travo.travo.service;

import com.travo.travo.model.DriverAttendance;
import com.travo.travo.repository.DriverAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DriverAttendanceService {

    @Autowired
    private DriverAttendanceRepository driverAttendanceRepository;

    public List<DriverAttendance> getAttendanceByDriverIDAndDate(String driverID, LocalDateTime date) {
        return driverAttendanceRepository.findByDriverIDAndDate(driverID, date.toLocalDate());
    }

    public DriverAttendance markAttendance(String driverID, String status) {
        LocalDateTime currentTime = LocalDateTime.now();
        DriverAttendance attendance = new DriverAttendance(driverID, currentTime.toLocalDate(), currentTime.toLocalTime(), status);
        return driverAttendanceRepository.save(attendance);
    }
}
