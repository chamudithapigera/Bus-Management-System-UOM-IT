package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "bus")
public class Bus {

    @Id
    private ObjectId id;
    private String busID;
    private String capacity;

    private List<BusHalt> busHalts;
    private List<BusRoute> busRoutes;

}
