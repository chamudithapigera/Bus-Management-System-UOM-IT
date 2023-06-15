package com.travo.travo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "busBreakdown")
public class BusBreakdown {

    @Id
    private String id;

    private String driverID;
    private String breakdownType;

    // Default constructor
    public BusBreakdown() {
    }

    // Parameterized constructor
    public BusBreakdown(String driverID, String breakdownType) {
        this.driverID = driverID;
        this.breakdownType = breakdownType;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDriverID() {
        return driverID;
    }

    public void setDriverID(String driverID) {
        this.driverID = driverID;
    }

    public String getBreakdownType() {
        return breakdownType;
    }

    public void setBreakdownType(String breakdownType) {
        this.breakdownType = breakdownType;
    }
}
