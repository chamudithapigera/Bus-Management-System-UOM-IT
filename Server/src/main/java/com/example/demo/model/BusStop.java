package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "busStops")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusStop {

    @Id
    private ObjectId s_id;
    private String busStopName;
    private String longitude;

    public BusStop(String busStopName, String longitude) {
        this.busStopName = busStopName;
        this.longitude = longitude;

    }


}
