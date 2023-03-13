package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "buses")
public class Bus {

    @Id
    private ObjectId id;
    private String busID;
    private String capacity;

    @DBRef
    private List<BusStop> busStopID;

    @DBRef
    private List<BusRoute> busRouteID;



}
