package com.example.demo;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Document(collection = "driverAttendance")
public class DriverAttendance {

    @Id
    private String id;

    private String username;

    private boolean present;

    private LocalDateTime checkInDateTime;




    public void setUsername(String username) {
    }

    public void setPresent(boolean present) {
    }

    public void setCheckInTime(LocalTime now) {
    }

    public void setDate(LocalDate now) {
    }

    // constructors, getters and setters
}
