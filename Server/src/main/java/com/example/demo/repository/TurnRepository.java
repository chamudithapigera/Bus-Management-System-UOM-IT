package com.example.demo.repository;

import com.example.demo.model.BusStop;
import com.example.demo.model.Turn;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurnRepository extends MongoRepository<Turn, ObjectId> {


}
