package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.model.BusLocation;
import com.example.demo.repository.BusLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BusLocationService {

    @Autowired
    private BusLocationRepository busLocationRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveBusLocation(BusLocation busLocation) {
        busLocationRepository.save(busLocation);
    }



}
