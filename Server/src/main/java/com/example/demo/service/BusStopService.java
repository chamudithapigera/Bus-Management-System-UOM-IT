package com.example.demo.service;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusStopRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public  class BusStopService {

    @Autowired
    private BusStopRepository busStopRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BusRepository busRepository;


    public BusStop createBusStopBy(String busStopID,String busStopName, String longitude,String latitude, String busID){
        BusStop busStop = new BusStop( busStopID, busStopName, longitude,latitude);
        busStopRepository.insert(busStop);

        mongoTemplate.update(Bus.class)
                .matching(Criteria.where("busID").is(busID))
                .apply(new org.springframework.data.mongodb.core.query.Update().push("busStop").value(busStop))
                .first();
        return busStop;

    }

    public List<BusStop> findAll() {
        return busStopRepository.findAll();
    }


  public BusStop updateBusStop(ObjectId id, BusStop busStop) {
        BusStop existingBusStop = busStopRepository.findById(id).orElseThrow(() -> new NotFoundException("Bus stop not found"));
        existingBusStop.setBusStopID(busStop.getBusStopID());
        existingBusStop.setBusStopName(busStop.getBusStopName());
        existingBusStop.setLongitude(busStop.getLongitude());
        return busStopRepository.save(existingBusStop);
    }

// In BusStopService class
    /*public BusStop updateBusStop(ObjectId id, BusStop busStop) {
        BusStop existingBusStop = busStopRepository.findById(id)
                .orElseThrow(() -> new BusStopNotFoundException("Bus stop not found with id " + id));

        existingBusStop.setBusStopID(busStop.getBusStopID());
        existingBusStop.setBusStopName(busStop.getBusStopName());
        existingBusStop.setLongitude(busStop.getLongitude());

        busStopRepository.save(existingBusStop);

        mongoTemplate.update(Bus.class)
                .matching(Criteria.where("busStop.s_id").is(existingBusStop.getId()))
                //.apply(new org.springframework.data.mongodb.core.query.Update().pullAll("busStop", new Object[]{existingBusStop}))
                //.first();
                .apply(new org.springframework.data.mongodb.core.query.Update().push("busStopID").value(busStop))
                .first();

        return existingBusStop;
    }
*/


}


