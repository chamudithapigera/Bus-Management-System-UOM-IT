package com.example.demo.service;

import com.example.demo.model.Passenger;
import com.example.demo.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerService {

    @Autowired
    private PassengerRepository passengerRepository;



    public List<Passenger> findAll() {
        return passengerRepository.findAll();
    }


    public void save(Passenger passenger) {
        passengerRepository.insert(passenger);
    }

}

