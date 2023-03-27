package com.example.demo.repositary;


import com.example.demo.model.Turn;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TurnRepository extends MongoRepository<Turn, ObjectId> {

    @Query("{'DriverID': { $elemMatch: { 'driverID': ?0 } } }")
    List<Turn> findTurn(String driverID);


}