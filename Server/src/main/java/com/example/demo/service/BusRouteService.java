package com.example.demo.service;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.repository.BusRouteRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusRouteService {

    @Autowired
    private BusRouteRepository busRouteRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public BusRoute createBusRouteBy(String routeID, String routeNO, String routeName, String busID){
        BusRoute busRoute = new BusRoute(routeID, routeNO, routeName);
        busRouteRepository.insert(busRoute);

        mongoTemplate.update(Bus.class)
                .matching(Criteria.where("busID").is(busID))
                .apply(new Update().push("busRoute").value(busRoute))
                .first();
        return busRoute;

    }

    public List<BusRoute> findAll() {
        return busRouteRepository.findAll();
    }


    public BusRoute updateBusRoute(ObjectId id, BusRoute busRoute) {
        BusRoute existingBusRoute = busRouteRepository.findById(id).orElseThrow(() -> new NotFoundException("Bus stop not found"));
        existingBusRoute.setRouteID(busRoute.getRouteID());
        existingBusRoute.setRouteNO(busRoute.getRouteNO());
        existingBusRoute.setRouteName(busRoute.getRouteName());
        return busRouteRepository.save(existingBusRoute);
    }

}
