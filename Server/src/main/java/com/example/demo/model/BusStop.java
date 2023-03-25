package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "busStop")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusStop {

    @Id
    private ObjectId s_id;
    private String busStopID;
    private String busStopName;
    private String longitude;
    //@DBRef
    //private List<Bus> buses;


    public BusStop(String busStopID,String busStopName,String longitude) {
        this.busStopID = busStopID;
        this.busStopName = busStopName;
        this.longitude = longitude;

    }

    public ObjectId getId() {
        return s_id;
    }


    //public ObjectId getId() {return s_id;}

}