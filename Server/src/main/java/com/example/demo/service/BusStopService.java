package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusStopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;


@Service
public class BusStopService {

    @Autowired
    private BusStopRepository busStopRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    
    public BusStop createBusStopBy(String busStopName, String longitude, String busID){
        BusStop busStop = new BusStop(busStopName,longitude);
        busStopRepository.insert(busStop);

        mongoTemplate.update(Bus.class)
                .matching(Criteria.where("busID").is(busID))
                .apply(new Update().push("busStopID").value(busStop))
                .first();
        return busStop;

    }

}
