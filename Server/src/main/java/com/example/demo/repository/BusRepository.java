package com.example.demo.repository;

import com.example.demo.model.Bus;
import com.example.demo.model.BusStop;
import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusRepository extends MongoRepository<Bus, ObjectId> {

   //Bus findByBusID(String busId);

   // List<Bus> findByBusStop(BusStop busStop);


}