package com.example.demo.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

public class Bus {

    @Id
    private ObjectId id;
    private String busID;
    private String capacity;
    @DocumentReference
    private String driver;
    @DocumentReference
    private List<BusStop> busStop;
    @DocumentReference
    private List<BusRoute> busRoute;

}
