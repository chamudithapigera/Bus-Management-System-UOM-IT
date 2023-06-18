package com.example.demo.service;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.model.Driver;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusStopRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Bus> findAll() {
        return busRepository.findAll();
    }

    public void save(Bus bus) {

        busRepository.insert(bus);
    }
    public Bus createBusBy(String busID,String capacity){

        // Check if a document with the given  busID already exists in the "Bus" collection
        if (mongoTemplate.exists(Query.query(Criteria.where("busID").is(busID)), Bus.class)) {
            throw new IllegalArgumentException("Bus with busID " + busID + " already exist,please enter correct busID");
        }

        Bus bus = new Bus( busID,capacity );
        busRepository.insert(bus);


        return bus;

    }
    public Bus updateBus(ObjectId id, Bus bus, String busID) {
        Bus existingBus = busRepository.findById(id).orElseThrow(() -> new NotFoundException("Bus is not found"));
        if (mongoTemplate.exists(Query.query(Criteria.where("busID").is(busID)), Bus.class)) {
            throw new IllegalArgumentException("Bus with busID " + busID + " already exist,please enter correct busID");
        }
        existingBus.setBusID(bus.getBusID());
        existingBus.setCapacity(bus.getCapacity());
        return busRepository.save(existingBus);
    }

    //get driver count in collection
    public long getBusCount() {
        return busRepository.count();
    }










   /* public List<Bus> findByBusStop(BusStop busStop) {
        return busRepository.findByBusStop(busStop);
    }*/

    //----


    /*public Bus updateBus(ObjectId id, Bus bus) {
        Bus existingBus = busRepository.findById(id)
                .orElseThrow(() -> new BusStopNotFoundException("Bus not found with id " + id));

        existingBus.setBusID(bus.getBusID());
        existingBus.setCapacity(bus.getCapacity());
        existingBus.setDriver(bus.getDriver());
        existingBus.setBusStop(bus.getBusStop());
        existingBus.setBusRoute(bus.getBusRoute());

        return busRepository.save(existingBus);
    }*/



   /*public Bus updateBusStop(ObjectId busId, ObjectId busStopId, BusStop busStop) {
        Bus bus = busRepository.findById(busId).orElseThrow(() -> new NotFoundException("Bus not found"));
        List<BusStop> busStops = bus.getBusStop();
        if (busStops == null) {busStops = new ArrayList<>();}
        BusStop updatedBusStop = busStopRepository.save(busStop);
        for (int i = 0; i < busStops.size(); i++) {
            if (busStops.get(i).getId().equals(busStopId)) {
                busStops.set(i, updatedBusStop);
                break;
            }
        }
        bus.setBusStop(busStops);
        return busRepository.save(bus);
    }*/


}




