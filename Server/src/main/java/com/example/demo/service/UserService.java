package com.example.demo.service;


import com.example.demo.exception.NotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public List<User> findAll() {
        return repository.findAll();
    }

    public User updateDriver(String id, User user) {
        User existingUser = repository.findById(id).orElseThrow(() -> new NotFoundException("Driver not found"));
        existingUser.setDriverId(user.getDriverId());
        existingUser.setEmail(user.getEmail());
        existingUser.setBusId(user.getBusId());
        existingUser.setUserRole(user.getUserRole());
        existingUser.setPassword(user.getPassword());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setTelephone(user.getTelephone());
        return repository.save(existingUser);
    }


    public User getUserByEmailTest(String email) {
        return repository.findByEmail(email);
    }

    public List<User> getUserByEmail(String email){
        return repository.getUserByEmail(email);
    }

    public List<User> getUserByTelephone(String telephone){
        return repository.getUserByEmail(telephone);
    }

    public List<User> getUserByEmailPassword(String email, String password){
        return repository.getUserByEmailPassword(email, password);
    }

    public User createNewUser(User user){
        return repository.save(user);
    }

    public User updateUser(User user){
        return repository.save(user);
    }

    //get driver count in collection
    public long getDriverCount() {
        return repository.count();

    }
}