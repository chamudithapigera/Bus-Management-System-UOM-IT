package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusStopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusStopService {

    @Autowired
    private BusStopRepository busStopRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

   // @Query(fields = "{busID: 0}")
    public BusStop createBusStopBy(String busStopID,String busStopName, String longitude,String busID){
        BusStop busStop = new BusStop( busStopID, busStopName, longitude);
        busStopRepository.insert(busStop);

        mongoTemplate.update(Bus.class)
                .matching(Criteria.where("busID").is(busID))
                .apply(new Update().push("busStopID").value(busStop))
                .first();
        return busStop;

    }

    public List<BusStop> findAll() {
        return busStopRepository.findAll();
    }


}

