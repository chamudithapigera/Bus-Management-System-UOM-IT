package com.example.demo.service;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.*;
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

    public Driver createDriverBy( String driverId, String firstName, String lastName, String email, String password, String telephone, String userRole, String busID){
        if (!mongoTemplate.exists(Query.query(Criteria.where("busID").is(busID)), Bus.class)) {
            throw new IllegalArgumentException("Bus with busID " + busID + " does not exist,please enter correct busID");
        }
        Driver driver = new Driver(  driverId,  firstName,  lastName,  email,  password,  telephone,  userRole,  busID);
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
        existingDriver.setDriverId(driver.getDriverId());
        existingDriver.setEmail(driver.getEmail());
        existingDriver.setFirstName(driver.getFirstName());
        existingDriver.setLastName(driver.getLastName());
        existingDriver.setTelephone(driver.getTelephone());
        existingDriver.setPassword(driver.getPassword());
        existingDriver.setUserRole(driver.getUserRole());

        return driverRepository.save(existingDriver);
    }
    public Driver createDriver(Driver driver){
        return driverRepository.save(driver);
    }

    public List<Driver> getDriverByEmail(String email){
        return driverRepository.getDriverByEmail(email);
    }


}
