package com.example.demo.repository;

import com.example.demo.model.DriverAttendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DriverAttendanceRepository extends MongoRepository<DriverAttendance, String> {
    List<DriverAttendance> findByDriverIDAndDate(String driverID, Date date);
}
