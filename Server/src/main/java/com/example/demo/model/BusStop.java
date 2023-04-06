package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "busStop")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusStop {

    @Id
    private String id;
    private String busStopID;
    private String busStopName;
    private String longitude;

    private String latitude;


    public BusStop(String busStopID,String busStopName,String longitude, String latitude) {
        this.busStopID = busStopID;
        this.busStopName = busStopName;
        this.longitude = longitude;
        this.latitude = latitude;
    }


}