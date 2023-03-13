package com.example.demo.repository;

import com.example.demo.model.BusRoute;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusRouteRepository extends MongoRepository<BusRoute, ObjectId> {
}
