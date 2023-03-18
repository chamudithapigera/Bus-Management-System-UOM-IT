package com.example.demo.service;

import com.example.demo.model.Driver;
import com.example.demo.model.Turn;
import com.example.demo.repository.TurnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurnService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private TurnRepository turnRepository;

    public void save(Turn turn) {
        turnRepository.insert(turn);
    }

    public List<String> getPresentDriverIdsSortedByCheckInTime() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("status").is("present")),
                Aggregation.sort(Sort.Direction.ASC, "checkInTime"),
                Aggregation.project("driverID")
        );
        AggregationResults<String> results = mongoTemplate.aggregate(aggregation, "driverAttendance", String.class);
        List<String> driverIds = results.getMappedResults();
        List<Turn> turns = mongoTemplate.findAll(Turn.class);
        int numTurns = turns.size();
        int numDrivers = driverIds.size();
        if (numTurns == numDrivers) {
            // Distribute drivers among turns based on turn order
            for (int i = 0; i < numTurns; i++) {
                Update update = new Update().set("driverID", driverIds.get(i));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(turns.get(i).getId())), update, Turn.class);
            }
        } else if (numTurns > numDrivers) {
            // Distribute drivers among all turns
            for (int i = 0; i < numTurns; i++) {
                int driverIndex = i % numDrivers;
                Update update = new Update().set("driverID", driverIds.get(driverIndex));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(turns.get(i).getId())), update, Turn.class);
            }
        } else {
            // Distribute drivers among turns in round-robin fashion
            int driverIndex = 0;
            for (int i = 0; i < numTurns; i++) {
                Update update = new Update().set("driverID", driverIds.get(driverIndex));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(turns.get(i).getId())), update, Turn.class);
                driverIndex = (driverIndex + 1) % numDrivers;
            }
        }
        return driverIds;
    }

    public List<Turn> findAll() {
        return turnRepository.findAll();
    }


}
