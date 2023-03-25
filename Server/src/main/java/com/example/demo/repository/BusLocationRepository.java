package com.example.demo.repository;

import com.example.demo.model.BusLocation;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Repository
public interface BusLocationRepository extends MongoRepository<BusLocation, String> {



  //  List<BusLocation> findByLongitudeBetweenAndLatitudeBetween(double minLongitude, double maxLongitude, double minLatitude, double maxLatitude);

  // @Query(value = "{ 'dateTime' : { $exists : true } }", fields = "{ 'busID' : 1}")
 //  List<String> findDistinctBusID();
  // BusLocation findTopByBusIDOrderByDateTimeDesc(String busID);

  @Aggregation(pipeline = {
          "{$sort: {busID: 1, dateTime: -1}}",
          "{$group: {_id: '$busID', latestLocation: {$first: '$$ROOT'}}}",
          "{$project: {_id: '$latestLocation.id', busID: '$latestLocation.busID',routeName:'$latestLocation.routeName', longitude: '$latestLocation.longitude', latitude: '$latestLocation.latitude', dateTime: '$latestLocation.dateTime'}}"
  })
  List<BusLocation> findLatestLocations();



}

