package com.example.demo.repository;

import com.example.demo.model.BusLocation;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface BusLocationRepository extends MongoRepository<BusLocation, String> {


  //returns a list of BusLocation objects representing the latest location for each bus
  @Aggregation(pipeline = {
          "{$sort: {busID: 1, dateTime: -1}}",
          "{$group: {_id: '$busID', latestLocation: {$first: '$$ROOT'}}}",
          "{$project: {_id: '$latestLocation.id', busID: '$latestLocation.busID',routeName:'$latestLocation.routeName', longitude: '$latestLocation.longitude', latitude: '$latestLocation.latitude', dateTime: '$latestLocation.dateTime'}}"
  })
  List<BusLocation> findLatestLocations();



}

