package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class BusService {
/*
    @Autowired
    private BusRepository busRepository;

    public List<Bus> allBuses(){
        System.out.println(busRepository.findAll().toString());
        return busRepository.findAll();
    }

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
