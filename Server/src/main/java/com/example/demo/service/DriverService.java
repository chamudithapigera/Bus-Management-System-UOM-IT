package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.model.Driver;
import com.example.demo.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Driver createDriverBy(String driverID, String driverName, String licenseNo, String busID){
        Driver driver = new Driver(driverID,driverName,licenseNo);
        driverRepository.insert(driver);

        mongoTemplate.update(Bus.class)
                .matching(Criteria.where("busID").is(busID))
                .apply(new Update().push("driverID").value(driver))
                .first();
        return driver;

    }

    public List<Driver> allDrivers(){
        return driverRepository.findAll();
    }


}
