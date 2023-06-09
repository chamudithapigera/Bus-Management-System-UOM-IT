package com.example.demo.service;

import java.util.List;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public List<User> getAllUsers(){
        return repository.findAll();
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
}
