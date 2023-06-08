package com.example.demo.service;


import com.example.demo.model.Bus;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userrepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    UserRepository repository;

    public List<User> getAllUsers(){
        return repository.findAll();
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

}
