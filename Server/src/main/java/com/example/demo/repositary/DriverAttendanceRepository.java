package com.example.demo.repositary;



import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.example.demo.model.DriverAttendance;
import com.example.demo.model.Turn;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DriverAttendanceRepository extends MongoRepository<DriverAttendance, String> {
    List<DriverAttendance> findByDriverIDAndDate(String driverID, Date date);

    Optional<Turn> getTurnByDriverID(String driverID);
}


