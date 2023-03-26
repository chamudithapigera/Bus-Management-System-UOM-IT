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
