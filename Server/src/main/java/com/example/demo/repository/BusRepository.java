package com.example.demo.repository;


import com.example.demo.model.Bus;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface BusRepository extends MongoRepository<Bus, ObjectId> {

    @Query("{'busStopID': { $elemMatch: { 'busStopName': ?0 } } }")
    List<Bus> findByBusStopName(String busStopName);

}
