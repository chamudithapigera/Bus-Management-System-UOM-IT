package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "BusRoute")
@NoArgsConstructor
@AllArgsConstructor
public class BusRoute {

    @Id
    private String id;

    private String routeID;
    private String routeNO;
    private String routeName;
















    public BusRoute(String routeID, String routeNO, String routeName) {
        this.routeID = routeID;
        this.routeNO = routeNO;
        this.routeName = routeName;
    }
}