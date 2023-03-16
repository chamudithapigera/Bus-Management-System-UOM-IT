package com.example.demo;



import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DriverAttendanceRepository extends MongoRepository<DriverAttendance, String> {
    List<DriverAttendance> findByDriverIDAndDate(String driverID, Date date);
}


