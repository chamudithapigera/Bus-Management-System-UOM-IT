package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
@Document(collection = "buses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bus {

    @Id
    private ObjectId id;
    private String busID;
    private String capacity;
    @DocumentReference
    private String driverID;
    @DocumentReference
    private List<BusStop> busStopID;
    @DocumentReference
    private List<BusRoute> busRouteID;

}
