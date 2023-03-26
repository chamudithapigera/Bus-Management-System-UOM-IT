package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "driverAttendance")
public class DriverAttendance {

    @Id
    private String id;
    private String driverID;
    private LocalDate date;
    private LocalTime checkInTime;
    private String status;


}
