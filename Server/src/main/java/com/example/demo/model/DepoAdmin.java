package com.example.demo.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "depoAdmin")
public class DepoAdmin{
    @Id
    private ObjectId id;

    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String telephone;
    private String userRole;
    private String depoAdminID;
    private String busId;

    public DepoAdmin( String firstName, String lastName, String email, String password, String telephone, String userRole, String depoAdminID, String busId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.telephone = telephone;
        this.userRole = userRole;
        this.depoAdminID = depoAdminID;
        this.busId = busId;
    }

    public ObjectId getId() {
        return this.id;
    }

    public void setId(ObjectId id) {
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

    public String getdepoAdminID() {
        return this.depoAdminID;
    }

    public void setdepoAdminID(String depoAdminID) {
        this.depoAdminID = depoAdminID;
    }

    public String getBusId() {
        return this.busId;
    }

    public void setBusId(String busId) {
        this.busId = busId;
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
                ", depoAdminID='" + getdepoAdminID() + "'" +
                ", busId='" + getBusId() + "'" +
                "}";
    }


}

