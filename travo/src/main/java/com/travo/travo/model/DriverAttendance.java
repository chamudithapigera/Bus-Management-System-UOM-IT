package com.travo.travo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "driverAttendance")
public class DriverAttendance {

    @Id
    private String id;
    private String driverID;
    private LocalDate date;
    private LocalTime checkInTime;
    private String status;

    public DriverAttendance() {
    }

    public DriverAttendance(String driverID, LocalDate date, LocalTime checkInTime, String status) {
        this.driverID = driverID;
        this.date = date;
        this.checkInTime = checkInTime;
        this.status = status;
    }

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
