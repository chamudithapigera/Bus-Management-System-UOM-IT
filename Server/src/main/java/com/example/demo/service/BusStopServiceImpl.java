package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusStopRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusStopServiceImpl extends BusStopService {

   /* @Autowired
    private BusStopRepository busStopRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BusRepository busRepository;



    @Override
    public List<BusStop> getAllBusStops() {
        return busStopRepository.findAll();
    }

    @Override
    public BusStop getBusStopById(ObjectId s_id) {
        Optional<BusStop> optionalBusStop = busStopRepository.findById(s_id);
        return optionalBusStop.orElse(null);
    }

    @Override
    public BusStop addBusStop(BusStop busStop) {
        return busStopRepository.save(busStop);
    }

    @Override
    public BusStop updateBusStop(ObjectId id, BusStop busStop) {
        Optional<BusStop> optionalBusStop = busStopRepository.findById(id);
        if (optionalBusStop.isPresent()) {
            BusStop existingBusStop = optionalBusStop.get();
            existingBusStop.setBusStopName(busStop.getBusStopName());
            existingBusStop.setLongitude(busStop.getLongitude());
            BusStop savedBusStop = busStopRepository.save(existingBusStop);

            // update buses containing this bus stop
            List<Bus> buses = busRepository.findByBusStop(savedBusStop);
            for (Bus bus : buses) {
                List<BusStop> busStops = bus.getBusStop();
                for (int i = 0; i < busStops.size(); i++) {
                    BusStop bs = busStops.get(i);
                    if (bs.getId().equals(savedBusStop.getId())) {
                        busStops.set(i, savedBusStop);
                        break;
                    }
                }
                bus.setBusStop(busStops);
                busRepository.save(bus);
            }

            return savedBusStop;
        } else {
            throw new BusStopNotFoundException("BusStop not found with id " );

        }
    }

    @Override
    public void deleteBusStop(ObjectId s_id) {
        busStopRepository.deleteById(s_id);
    }
}

 class BusStopNotFoundException extends RuntimeException {
    public BusStopNotFoundException(String message) {
        super(message);
    }*/
}


