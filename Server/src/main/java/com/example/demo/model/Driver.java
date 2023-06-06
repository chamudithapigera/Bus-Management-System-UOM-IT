package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "driver")
@NoArgsConstructor
@AllArgsConstructor
public class Driver {

    @Id
    private String id;
    private String driverID;
    private String driverName;
    private String licenseNo;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String telephone;
    private String userRole;
    private String driverId;
    private String busId;

    public Driver(String driverID, String driverName, String licenseNo) {
        this.driverID = driverID;
        this.driverName = driverName;
        this.licenseNo = licenseNo;
    }







}


