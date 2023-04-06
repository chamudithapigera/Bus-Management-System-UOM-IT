package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;
@Document(collection = "buses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bus {

    @Id
    private String id;
    private String busID;
    private String capacity;
    @DBRef
   //@DocumentReference
    private List<Driver> driver;
   @DBRef
   // @DocumentReference
    private List<BusStop> busStop ;
  @DBRef
  // @DocumentReference
    private List<BusRoute> busRoute;

    public Bus(String busID,String capacity, List<Driver> driver,List<BusStop> busStop,List<BusRoute> busRoute) {
        this.busID = busID;
        this.capacity = capacity;
        this.driver = driver;
        this.busStop = busStop;
        this.busRoute = busRoute;
    }


}
