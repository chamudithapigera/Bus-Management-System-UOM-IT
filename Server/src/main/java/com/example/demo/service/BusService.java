package com.example.demo.service;

import com.example.demo.model.Bus;
import com.example.demo.model.Driver;
import com.example.demo.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


}



