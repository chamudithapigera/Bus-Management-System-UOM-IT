package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "turn")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Turn {

    @Id
    private String id;
    private String turnNo;
    //private LocalDate turnDate;
    private String turnTime;
    private String routeName;
    private String driverID;


}



