package com.travo.driver_module;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "driver_attendance")
public class DriverAttendance {

    @Id
    private String id;

    private String username;

    private LocalDateTime dateTime;

    private boolean isPresent;

    public DriverAttendance(String username, boolean isPresent) {
        this.username = username;
        this.isPresent = isPresent;
        this.dateTime = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public boolean isPresent() {
        return isPresent;
    }

    public void setPresent(boolean present) {
        isPresent = present;
    }
}
