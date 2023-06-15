package com.travo.travo.repository;

import com.travo.travo.model.DriverAttendance;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface DriverAttendanceRepository extends MongoRepository<DriverAttendance, String> {
    List<DriverAttendance> findByDriverIDAndDate(String driverID, LocalDate date);
}
