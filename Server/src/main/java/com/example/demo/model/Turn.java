package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.awt.*;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "turn")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Turn {

    @Id
    private ObjectId id;
    private String turnNo;
    //private LocalDate turnDate;
    private String[] turnTime;
    private String[] routeName;
    private String driverID;


}
