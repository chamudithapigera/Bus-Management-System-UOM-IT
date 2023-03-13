package com.example.demo.repository;

import com.example.demo.model.BusStop;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BusStopRepository extends MongoRepository<BusStop, ObjectId> {
}
