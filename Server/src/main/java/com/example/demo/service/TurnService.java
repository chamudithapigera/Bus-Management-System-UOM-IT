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
import org.w3c.dom.Document;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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

    public void resetTurnCollection() {
        mongoTemplate.remove(new Query(), "turn");
    }

    //public List<Turn> findAll() {return turnRepository.findAll();}

  /*  public List<String> getPresentDriverIdsSortedByCheckInTime() {
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

        // Retrieve the first record in the turn collection
       // Turn firstTurn = mongoTemplate.findOne(Query.query(new Criteria()).limit(1), Turn.class);

// Retrieve the value of the routeName field from the first record
        //String routeName = String.valueOf(firstTurn.getRouteName());

// Get the first record in the turn collection
        Turn firstTurn = mongoTemplate.findOne(Query.query(new Criteria()).limit(1), Turn.class);

// Get the routeName field value from the first turn record
        String firstRouteName = firstTurn.getRouteName();
        List<Turn> turnss = mongoTemplate.findAll(Turn.class);
        for (Turn turn : turnss) {
            if (turn.getRouteName().equals(firstRouteName)) {

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
        } else {
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

        }
    }
        return driverIds;
    }*/

    public List<String> getPresentDriverIdsSortedByCheckInTime() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("status").is("present")),
                Aggregation.sort(Sort.Direction.ASC, "checkInTime"),
                Aggregation.project("driverID")
        );
        AggregationResults<String> results = mongoTemplate.aggregate(aggregation, "driverAttendance", String.class);
        List<String> driverIds = results.getMappedResults();

        // Get the first record in the "turn" collection to compare routeNames
        Turn firstTurn = mongoTemplate.findOne(Query.query(new Criteria()).with(Sort.by(Sort.Direction.ASC, "turnTime")), Turn.class);
        String firstRouteName = firstTurn.getRouteName();

        // Assign filtered driverIDs to records that have the same routeName
        List<Turn> sameRouteTurns = mongoTemplate.find(Query.query(Criteria.where("routeName").is(firstRouteName)), Turn.class);
        int sameRouteCount = sameRouteTurns.size();
        int numDrivers = driverIds.size();
        if (sameRouteCount == numDrivers) {
        for (int i = 0; i < sameRouteCount; i++) {
            Update update = new Update().set("driverID", driverIds.get(i));
            mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(sameRouteTurns.get(i).getId())), update, Turn.class);
        }}
        else if (sameRouteCount > numDrivers) {
            // Distribute drivers among all turns
            for (int i = 0; i < sameRouteCount; i++) {
                int driverIndex = i % numDrivers;
                Update update = new Update().set("driverID", driverIds.get(driverIndex));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(sameRouteTurns.get(i).getId())), update, Turn.class);

            }
        } else {
            // Distribute drivers among turns in round-robin fashion
            int driverIndex = 0;
            for (int i = 0; i < sameRouteCount; i++) {
                Update update = new Update().set("driverID", driverIds.get(driverIndex));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(sameRouteTurns.get(i).getId())), update, Turn.class);
                driverIndex = (driverIndex + 1) % numDrivers;
            }
        }

        // Assign filtered driverIDs to records that have a different routeName
        List<Turn> differentRouteTurns = mongoTemplate.find(Query.query(Criteria.where("routeName").ne(firstRouteName)), Turn.class);
        int differentRouteCount = differentRouteTurns.size();
      //  int driverIndex = sameRouteCount;
        //int numDrivers = driverIds.size();
        if (differentRouteCount == numDrivers) {
            for (int i = 0; i < differentRouteCount; i++) {
                Update update = new Update().set("driverID", driverIds.get(i));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(differentRouteTurns.get(i).getId())), update, Turn.class);
            }}
        else if (differentRouteCount > numDrivers) {
            // Distribute drivers among all turns
            for (int i = 0; i < differentRouteCount; i++) {
                int driverIndex = i % numDrivers;
                Update update = new Update().set("driverID", driverIds.get(driverIndex));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(differentRouteTurns.get(i).getId())), update, Turn.class);

            }
        } else {
            // Distribute drivers among turns in round-robin fashion
            int driverIndex = 0;
            for (int i = 0; i < differentRouteCount; i++) {
                Update update = new Update().set("driverID", driverIds.get(driverIndex));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(differentRouteTurns.get(i).getId())), update, Turn.class);
                driverIndex = (driverIndex + 1) % numDrivers;
            }
        }
       /* for (int i = 0; i < differentRouteCount; i++) {
            Update update = new Update().set("driverID", driverIds.get(driverIndex));
            mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(differentRouteTurns.get(i).getId())), update, Turn.class);
            driverIndex++;
            if (driverIndex >= driverIds.size()) {
                driverIndex = sameRouteCount;
            }
        }*/

        return driverIds;
    }






}
