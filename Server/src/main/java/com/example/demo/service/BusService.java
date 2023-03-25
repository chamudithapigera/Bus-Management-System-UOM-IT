package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.model.BusStop;
import com.example.demo.model.Driver;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusStopRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;
    public List<Bus> findAll() {
        return busRepository.findAll();
    }
    //public Optional<Bus> singleBus(String busID){return busRepository.findBusBybusID(busID);}

    public void save(Bus bus) {
        busRepository.insert(bus);
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

    @Autowired
    private BusStopRepository busStopRepository;

    public Bus updateBusStop(ObjectId busId, ObjectId busStopId, BusStop busStop) {
        Bus bus = busRepository.findById(busId).orElseThrow(() -> new BusStopNotFoundException("Bus not found"));
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
    }


}

 class BusStopNotFoundException extends RuntimeException {
    public BusStopNotFoundException(String message) {
        super(message);
    }
}




