package com.example.demo.model;


public class BusLocationWithDistance {
    private BusLocation busLocation;
    private double distance;

    public BusLocationWithDistance(BusLocation busLocation, double distance) {
        this.busLocation = busLocation;
        this.distance = distance;
    }

    public BusLocation getBusLocation() {
        return busLocation;
    }

    public double getDistance() {
        return distance;
    }
}