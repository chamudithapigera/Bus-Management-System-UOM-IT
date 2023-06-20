package com.example.demo.repository;

import com.example.demo.model.Bus;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BusRepository extends MongoRepository<Bus, ObjectId> {

    //get one document data of collection
   Optional<Bus> findById(String busId);

//check busid is in driver collection
    boolean existsByBusID(String busId);















    Bus findByBusRouteId(String busRouteID);

}