package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;

    public void save(Bus bus) {
        busRepository.insert(bus);
    }

    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Map> getLatestBusesByStopName(String busStopName) {
        Criteria criteria = Criteria.where("busStopID.busStopName").is(busStopName);

        AggregationOperation match = Aggregation.match(criteria);

        AggregationOperation sort = Aggregation.sort(Sort.Direction.DESC, "dateTime");

        AggregationOperation group = Aggregation.group("busID", "busRouteID", "busStopID.busStopName")
                .first("busID").as("busID")
                .first("busRouteID").as("busRouteID")
                .first("busStopID.busStopName").as("busStopName")
                .first("routeName").as("routeName")
                .first("longitude").as("longitude")
                .first("latitude").as("latitude");

        AggregationOperation project = Aggregation.project()
                .and("busID").as("busID")
                .and("busRouteID").as("busRouteID")
                .and("busStopName").as("busStopName")
                .and("routeName").as("routeName")
                .and("longitude").as("longitude")
                .and("latitude").as("latitude");

        Aggregation aggregation = Aggregation.newAggregation(match, sort, group, project);

        return mongoTemplate.aggregate(aggregation, "buslocations", Map.class).getMappedResults();
    }



/*
    public Optional<Bus> singleBus(String busID){
        return busRepository.findBusBybusID(busID);
    }

    public List<Bus> getBusesByHaltIdAndTime(String haltID) {
        List<Bus> buses = busRepository.findAll();
        List<Bus> filteredBuses = new ArrayList<>();

        for (Bus bus : buses) {
            for (BusHalt busHalt : bus.getBusHalts()) {
                if (busHalt.getHaltID().equals(haltID)) {
                    filteredBuses.add(bus);
                    break;
                }
            }
        }

        return filteredBuses;
    }

*/
}
