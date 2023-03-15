package com.example.demo;



import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverAttendanceRepository extends MongoRepository<DriverAttendance, String>{
    DriverAttendance findByUsernameAndDate(String username, Date date);

    List<DriverAttendance> findByDate(LocalDate date);

    List<DriverAttendance> findByUsername(String username);
}
