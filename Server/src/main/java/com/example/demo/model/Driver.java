package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "driver")
@NoArgsConstructor
@AllArgsConstructor
public class Driver {

    @Id
    private String id;
    private String driverId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String telephone;
    private String userRole;

    private String busID;

    public Driver( String firstName, String lastName, String email, String password, String telephone, String userRole, String driverId, String busID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.telephone = telephone;
        this.userRole = userRole;
        this.driverId = driverId;
        this.busID = busID;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getUserRole() {
        return this.userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getDriverId() {
        return this.driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }

    public String getBusID() {
        return this.busID;
    }

    public void setBusID(String busID) {
        this.busID = busID;
    }


    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", firstName='" + getFirstName() + "'" +
                ", lastName='" + getLastName() + "'" +
                ", email='" + getEmail() + "'" +
                ", password='" + getPassword() + "'" +
                ", telephone='" + getTelephone() + "'" +
                ", userRole='" + getUserRole() + "'" +
                ", driverId='" + getDriverId() + "'" +
                ", busID='" + getBusID() + "'" +
                "}";
    }



}


