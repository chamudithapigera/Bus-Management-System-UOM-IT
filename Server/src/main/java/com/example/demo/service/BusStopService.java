package com.example.demo.service;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusStopRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;


import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Service;



//import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

@Service
public  class BusStopService {

    @Autowired
    private BusStopRepository busStopRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private BusService busService;


   /* public void updateBusStop(BusStop busStop) {
        busStopRepository.save(busStop);

        List<Bus> buses = busRepository.findByBusStop(busStop);
        for (Bus bus : buses) {
            bus.setBusStop((List<BusStop>) busStop);
            busRepository.save(bus);
        }
    }*/

   // @Query(fields = "{busID: 0}")
    public BusStop createBusStopBy(String busStopID,String busStopName, String longitude,String busID){
        BusStop busStop = new BusStop( busStopID, busStopName, longitude);
        busStopRepository.insert(busStop);

        mongoTemplate.update(Bus.class)
                .matching(Criteria.where("busID").is(busID))
                .apply(new org.springframework.data.mongodb.core.query.Update().push("busStopID").value(busStop))
                .first();
        return busStop;


    }


    public List<BusStop> findAll() {
        return busStopRepository.findAll();
    }


    //----
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

  public BusStop updateBusStop(ObjectId id, BusStop busStop) {
        BusStop existingBusStop = busStopRepository.findById(id).orElseThrow(() -> new NotFoundException("Bus stop not found"));
        existingBusStop.setBusStopID(busStop.getBusStopID());
        existingBusStop.setBusStopName(busStop.getBusStopName());
        existingBusStop.setLongitude(busStop.getLongitude());
        return busStopRepository.save(existingBusStop);
    }



    /*public List<BusStop> getAllBusStops() {
        return busStopRepository.findAll();
    }

    public Optional<BusStop> getBusStopById(String id) {
        return busStopRepository.findById(new ObjectId(id));
    }

    public abstract BusStop getBusStopById(ObjectId s_id);

    public BusStop addBusStop(BusStop busStop) {
        return busStopRepository.save(busStop);
    }

    public void deleteBusStop(String id) {
        busStopRepository.deleteById(new ObjectId(id));
    }

    public void updateBusStop(String id, BusStop busStop) {
        busStop.setS_id(new ObjectId(id));
        busStopRepository.save(busStop);
    }


    public abstract BusStop updateBusStop(ObjectId s_id, BusStop busStop);

    public abstract void deleteBusStop(ObjectId s_id);*/
}


