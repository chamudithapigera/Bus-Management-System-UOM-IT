package com.travo.travo.repository;

import com.travo.travo.model.Turn;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TurnRepository extends MongoRepository<Turn, String> {
    List<Turn> findByDriverId(String driverId);

    
}

