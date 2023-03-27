package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Passenger")
@NoArgsConstructor
@AllArgsConstructor
public class Passenger {
    @Id
    private String id;
    private String passengerID;
    private String passengerName;
    private String email;

    public Passenger(String passengerID, String passengerName, String email) {
        this.passengerID = passengerID;
        this.passengerName = passengerName;
        this.email = email;
    }
}



