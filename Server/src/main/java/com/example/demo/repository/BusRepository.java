package com.example.demo.repository;

import com.example.demo.model.Bus;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusRepository extends MongoRepository<Bus, ObjectId> {
    Optional<Object> findBusBybusID(String id);


    // void deleteById(String busID);
}