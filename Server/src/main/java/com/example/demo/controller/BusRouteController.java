package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.repository.BusRepository;
import com.example.demo.repository.BusRouteRepository;
import com.example.demo.service.BusRouteService;
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
@RequestMapping("/api/v1/busRoute")
public class BusRouteController {

    @Autowired
    private BusRouteService busRouteService;

    @Autowired
    private BusRouteRepository busRouteRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    //add new data
    @PostMapping("/addRoute")
    public ResponseEntity<BusRoute> createBusRoute(@RequestBody Map<String, String> payload){

        return new ResponseEntity<BusRoute>(busRouteService.createBusRouteBy(payload.get("routeID"),payload.get("routeNO"),payload.get("routeName"),payload.get("busID")), HttpStatus.CREATED);
    }

    //get all documents in collection
    @GetMapping("/viewBusRoute")
    public List<BusRoute> findAllBusRoutesWithDetails() {
        return busRouteService.findAll();
    }

    //get only one  documents matched with given id
    @GetMapping("viewone/{id}")
    BusRoute getBusRouteById(@PathVariable ObjectId id){
        return busRouteRepository.findById(id)
                .orElseThrow(()->new NotFoundException(("Bus Route not found with id: " + id)));
    }


    //update one document
   @PutMapping("/{id}")
    public ResponseEntity<BusRoute> updateBusRoute(@PathVariable("id") ObjectId id, @RequestBody BusRoute busRoute) {
        BusRoute updatedBusRoute = busRouteService.updateBusRoute(id, busRoute);
        return ResponseEntity.ok(updatedBusRoute);
    }

    //delete document with given id
    @DeleteMapping("/deleteRoute/{id}")
    String deleteRoute(@PathVariable ObjectId id){
        if (!busRouteRepository.existsById(id)){
            throw new NotFoundException(("Bus Route not found with id: " + id));
        }
        busRouteRepository.deleteById(id);
        return "Bus Route with id " +id+ "has been deleted";

    }
   /* @DeleteMapping("/deleteRoute/{id}")
    String deleteRoute(@PathVariable ObjectId id){
        if (!busRouteRepository.existsById(id)){
            throw new NotFoundException(("Bus Route not found with id: " + id));
        }
        try {
            List<Bus> buses = busRepository.findAll();
            for (Bus bus : buses) {
                List<BusRoute> busRoutes = bus.getBusRoute();
                for (BusRoute busRoute : busRoutes) {
                    if (busRoute.getId().equals(String.valueOf(id))) {
                        busRoutes.remove(busRoute);
                        bus.setBusRoute(busRoutes);
                        busRepository.save(bus);
                        busRouteRepository.deleteById(id);
                    }
                }
            }

        } catch (Exception e) {
            return e.getMessage();
        }
        // busRouteRepository.deleteById(id);

        //deleteBusRoute(String.valueOf(id));
        return "Bus Route with id " +id+ "has been deleted";
    }*/



 /* @PutMapping("/updatebusRoute/{id}")
    public ResponseEntity<String> updateBusRoute(@PathVariable("id") ObjectId id, @RequestBody BusRoute busRoute) {
        Optional<BusRoute> optionalBusRoute = busRouteRepository.findById(id);
        if (optionalBusRoute.isPresent()) {
            BusRoute existingBusRoute = optionalBusRoute.get();
            existingBusRoute.setRouteID(busRoute.getRouteID());
            existingBusRoute.setRouteNO(busRoute.getRouteNO());
            existingBusRoute.setRouteName(busRoute.getRouteName());

          busRouteRepository.save(existingBusRoute);
            //busRepository.save(existingBusStop);
            return new ResponseEntity<>("BusRoute updated successfully...", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("BusRoute not found...", HttpStatus.NOT_FOUND);
        }
    }*/
 @Autowired
 private BusRepository busRepository;
    @DeleteMapping("/busRoute/{id}")
    public ResponseEntity<String> deleteBusRoute( String id) {


        try {
            List<Bus> buses = busRepository.findAll();
            for (Bus bus : buses) {
                List<BusRoute> busRoutes = bus.getBusRoute();
                for (BusRoute busRoute : busRoutes) {
                    if (busRoute.getId().equals(id)) {
                        busRoutes.remove(busRoute);
                        bus.setBusRoute(busRoutes);
                        busRepository.save(bus);


                        return ResponseEntity.status(HttpStatus.OK).body("Bus route with ID " + id + " has been deleted successfully.");
                    }
                }
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bus route with ID " + id + " does not exist.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting bus route with ID " + id + ": " + e.getMessage());
        }
    }



}