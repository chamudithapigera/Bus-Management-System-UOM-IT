package com.example.demo.service;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Turn;
import com.example.demo.repository.TurnRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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



    public Turn updateTurn(ObjectId id, Turn turn) {
        Turn existingTurn = turnRepository.findById(id).orElseThrow(() -> new NotFoundException("Turn not found"));
        existingTurn.setTurnNo(turn.getTurnNo());
        existingTurn.setTurnTime(turn.getTurnTime());
        existingTurn.setRouteName(turn.getRouteName());
        return turnRepository.save(existingTurn);
    }

    //assign filtered driverIDs to daily turns
    public List<String> getPresentDriverIdsSortedByCheckInTime() {
        LocalDate today = LocalDate.now();
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("status").is("present").and("date").is(today)),
                //Aggregation.match(Criteria.where("status").is("present")),
                Aggregation.sort(Sort.Direction.ASC, "checkInTime"),
                Aggregation.project("driverID").andExclude("_id")
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
            // Distribute drivers among turns
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
            // Distribute drivers among turns
            int driverIndex = 0;
            for (int i = 0; i < differentRouteCount; i++) {
                Update update = new Update().set("driverID", driverIds.get(driverIndex));
                mongoTemplate.updateFirst(Query.query(Criteria.where("_id").is(differentRouteTurns.get(i).getId())), update, Turn.class);
                driverIndex = (driverIndex + 1) % numDrivers;
            }
        }

        return driverIds;
    }


    //get driver count in collection
    public long getTurnCount() {
        return turnRepository.count();
    }
}
// public void resetTurnCollection() {
//        mongoTemplate.remove(new Query(), "turn");
//    }