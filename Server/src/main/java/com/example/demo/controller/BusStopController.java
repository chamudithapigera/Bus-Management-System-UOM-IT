package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.BusStop;
import com.example.demo.repository.BusStopRepository;
import com.example.demo.service.BusStopService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/busStop")
public class BusStopController {

    @Autowired
    private BusStopService busStopService;
    @Autowired
    private BusStopRepository busStopRepository;


    //add new data
    @PostMapping("/addBusStop")
    public ResponseEntity<BusStop> createBusStop(@RequestBody Map<String, String> payload){

        return new ResponseEntity<BusStop>(busStopService.createBusStopBy(payload.get("busStopID"),payload.get("busStopName"),payload.get("longitude"),payload.get("latitude"),payload.get("busID")), HttpStatus.CREATED);
    }

    //get all documents in collection
    @GetMapping("/viewBusStop")
    public List<BusStop> findAllBusStopsWithDetails() {
        return busStopService.findAll();
    }

    //get only one  documents matched with given id
    @GetMapping("/viewone/{id}")
    BusStop getBusStopById(@PathVariable ObjectId id){
        return busStopRepository.findById(id)
                .orElseThrow(()->new NotFoundException(("Bus Stop not found with id: " + id)));
    }

    //update one document
    @PutMapping("/{id}")
    public ResponseEntity<BusStop> updateBusStop(@PathVariable("id") ObjectId id, @RequestBody BusStop busStop) {
        BusStop updatedBusStop = busStopService.updateBusStop(id, busStop);
        return ResponseEntity.ok(updatedBusStop);
    }

    //delete document with given id
    @DeleteMapping("/deleteStop/{id}")
    String deleteStop(@PathVariable ObjectId id){
        if (!busStopRepository.existsById(id)){
            throw new NotFoundException(("Bus Stop not found with id: " + id));
        }
        busStopRepository.deleteById(id);
        return "Bus Stop with id " +id+ "has been deleted";

    }


  /* @PutMapping("/updatebusStop/{s_id}")
    public ResponseEntity<String> updateBusStop(@PathVariable("s_id") ObjectId s_id, @RequestBody BusStop busStop) {
        Optional<BusStop> optionalBusStop = busStopRepository.findById(s_id);
        if (optionalBusStop.isPresent()) {
            BusStop existingBusStop = optionalBusStop.get();
            existingBusStop.setBusStopName(busStop.getBusStopName());
            existingBusStop.setLongitude(busStop.getLongitude());

            busStopRepository.save(existingBusStop);
            //busRepository.save(existingBusStop);
            return new ResponseEntity<>("BusStop updated successfully...", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("BusStop not found...", HttpStatus.NOT_FOUND);
        }
    }*/
  /* @PutMapping("/updatebusStop/{s_id}")
    public BusStop updateBusStop(BusStop busStop) {
        // Update the busStop document
        busStopRepository.save(busStop);

        // Update the relevant Bus documents
        List<Bus> buses = busRepository.findByBusStop(busStop);
        for (Bus bus : buses) {
            List<BusStop> busStops = bus.getBusStop();
            for (BusStop bs : busStops) {
                if (bs.getId().equals(busStop.getId())) {
                    bs.setBusStopName(busStop.getBusStopName());
                    bs.setLongitude(busStop.getLongitude());
                    break;
                }
            }
            busRepository.save(bus);
        }

        return busStop;
    }*/
//-----



    //new


  /*  @PutMapping("/{id}")
    public ResponseEntity<?> updateBusStop(@PathVariable ObjectId id, @RequestBody BusStop busStop) {
        BusStop updatedBusStop = busStopService.updateBusStop(id, busStop);
        return ResponseEntity.ok(updatedBusStop);
    }*/

  /*  @PutMapping("/updatebusStop/{s_id}")
    public ResponseEntity<String> updateBusStop(@PathVariable("s_id") ObjectId s_id, @RequestBody BusStop busStop) {
        Optional<BusStop> optionalBusStop = busStopRepository.findById(s_id);
        if (optionalBusStop.isPresent()) {
            BusStop existingBusStop = optionalBusStop.get();
            existingBusStop.setBusStopName(busStop.getBusStopName());
            existingBusStop.setLongitude(busStop.getLongitude());

            busStopRepository.save(existingBusStop);

            // update buses with the new bus stop information
            List<Bus> buses = busRepository.findByBusStop(existingBusStop);
            for (Bus bus : buses) {
                List<BusStop> busStops = bus.getBusStop();
                for (int i = 0; i < busStops.size(); i++) {
                    BusStop bs = busStops.get(i);
                    if (bs.getS_id().equals(existingBusStop.getS_id())) {
                        busStops.set(i, existingBusStop);
                        break;
                    }
                }
                bus.setBusStop(busStops);
                busRepository.save(bus);
            }

            return new ResponseEntity<>("BusStop updated successfully...", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("BusStop not found...", HttpStatus.NOT_FOUND);
        }
    }*/


}

