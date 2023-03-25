package com.example.demo.model;

import java.time.LocalDateTime;

public class BusLocationWithDistanceAndDuration {
    private BusLocation busLocation;
    private double distance;
    private int duration;
    private LocalDateTime arrivalTime;

    public BusLocationWithDistanceAndDuration(BusLocation busLocation, double distance,int duration,LocalDateTime arrivalTime) {
        this.busLocation = busLocation;
        this.distance = distance;
        this.duration = duration;
        this.arrivalTime = arrivalTime;

    }

    public BusLocation getBusLocation() {
        return busLocation;
    }

    public double getDistance() {
        return distance;
    }

    public int getDuration() {
        return duration;
    }

    public LocalDateTime getArrivalTime(){
        return arrivalTime;
    }

}