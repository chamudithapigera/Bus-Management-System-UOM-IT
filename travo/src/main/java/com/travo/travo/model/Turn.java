package com.travo.travo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "turns")
public class Turn {

    @Id
    private String id;
    private String driverId;
    private String routeId;
    private String startPoint; // new field
    private String endPoint;   // new field
    private boolean started;
    private boolean ended;

    public Turn() {
    }

    public Turn(String driverId, String routeId, String startPoint, String endPoint) {
        this.driverId = driverId;
        this.routeId = routeId;
        this.startPoint = startPoint; // initializing new field
        this.endPoint = endPoint;     // initializing new field
        this.started = false;
        this.ended = false;
    }

    public Turn(String id) {
        this.id = id;
    }


    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public boolean isStarted() {
        return started;
    }

    public void setStarted(boolean started) {
        this.started = started;
    }

    public boolean isEnded() {
        return ended;
    }

    public void setEnded(boolean ended) {
        this.ended = ended;
    }
}
