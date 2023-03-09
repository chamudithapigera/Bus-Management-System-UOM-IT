package com.example.demo.repository;


import com.example.demo.model.Bus;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends MongoRepository<Bus, ObjectId> {


    List<Bus> findByBusID(String busID);

    @Query("{'BusHalt.haltName': ?0}")
    List<Bus> findByBusbyHaltName(String haltName);

}
