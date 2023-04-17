package com.example.demo.service;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.BusStop;
import com.example.demo.model.Driver;
import com.example.demo.repository.DriverRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
        if (!mongoTemplate.exists(Query.query(Criteria.where("busID").is(busID)), Bus.class)) {
            throw new IllegalArgumentException("Bus with busID " + busID + " does not exist,please enter correct busID");
        }
        Driver driver = new Driver(driverID,driverName,licenseNo);
        driverRepository.insert(driver);

        mongoTemplate.update(Bus.class)
                .matching(Criteria.where("busID").is(busID))
                .apply(new Update().push("driver").value(driver))
                .first();
        return driver;

    }

    public List<Driver> findAll() {
        return driverRepository.findAll();
    }

    public Driver updateDriver(ObjectId id, Driver driver) {
        Driver existingDriver = driverRepository.findById(id).orElseThrow(() -> new NotFoundException("Driver not found"));
        existingDriver.setDriverID(driver.getDriverID());
        existingDriver.setDriverName(driver.getDriverName());
        existingDriver.setLicenseNo(driver.getLicenseNo());
        return driverRepository.save(existingDriver);
    }



}
