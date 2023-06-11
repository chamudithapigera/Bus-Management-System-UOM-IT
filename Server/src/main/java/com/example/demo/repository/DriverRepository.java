package com.example.demo.repository;

import com.example.demo.model.Driver;
import com.example.demo.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends MongoRepository<Driver, ObjectId> {
    @Query("{email: ?0}")
    List<Driver> getDriverByEmail(String email);
}


