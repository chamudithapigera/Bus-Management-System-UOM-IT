package com.travo.driver_module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverAttendanceService {

    private final DriverAttendanceRepository driverAttendanceRepository;

    @Autowired
    public DriverAttendanceService(DriverAttendanceRepository driverAttendanceRepository) {
        this.driverAttendanceRepository = driverAttendanceRepository;
    }

    public void saveAttendance(String username, boolean isPresent) {
        DriverAttendance attendance = new DriverAttendance(username, isPresent);
        driverAttendanceRepository.save(attendance);
    }
}
