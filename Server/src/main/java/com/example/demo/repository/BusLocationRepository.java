package com.example.demo.repository;

import com.example.demo.model.BusLocation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusLocationRepository extends MongoRepository<BusLocation, String> {
}
