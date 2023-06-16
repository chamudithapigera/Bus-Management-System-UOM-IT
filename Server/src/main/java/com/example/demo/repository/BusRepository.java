package com.example.demo.repository;

import com.example.demo.model.Bus;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BusRepository extends MongoRepository<Bus, ObjectId> {

    Optional<Bus> findById(String busId);

    Bus findByBusRouteId(String busRouteID);
//check busid is in driver collection
    boolean existsByBusID(String busId);



    // List<Bus> findByBusStop(BusStop busStop);


}